package com.bookstore_manager.backend.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.bookstore_manager.backend.entities.Token;
import com.bookstore_manager.backend.entities.User;
import com.bookstore_manager.backend.repositories.TokenRepository;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private TokenRepository tokenRepository;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("library-hub")
                    .withSubject(user.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);

            // Salvar o token no banco de dados
            Token tokenEntity = new Token();
            tokenEntity.setToken(token);
            tokenEntity.setUsername(user.getUsername());
            tokenEntity.setCreatedAt(LocalDateTime.now());
            tokenEntity.setExpiresAt(genExpirationDate().atOffset(ZoneOffset.of("-03:00")).toLocalDateTime());
            tokenEntity.setRevoked(false);
            tokenEntity.setExpired(false);

            tokenRepository.save(tokenEntity);

            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating token: " + e);
        }
    }

    public String validateToken(String token) {
        try {
            // Verificar se o token existe no banco de dados e não está revogado/expirado
            Token storedToken = tokenRepository.findByToken(token)
                    .orElseThrow(() -> new JWTVerificationException("Token not found"));

            if (storedToken.isRevoked() || storedToken.isExpired()) {
                throw new JWTVerificationException("Token is invalid");
            }

            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("library-hub")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
