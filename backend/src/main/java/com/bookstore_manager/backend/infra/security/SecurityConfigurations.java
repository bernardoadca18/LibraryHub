package com.bookstore_manager.backend.infra.security;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import com.bookstore_manager.backend.infra.security.SecurityConstants;
import com.bookstore_manager.backend.infra.security.SecurityFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Value("${jwt.expiration}")
    private String jwtExpiration;

    @Autowired
    private SecurityFilter securityFilter;

    @Value("${api.security.token.secret}")
    private String secret;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                // Endpoints públicos
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/auth/register-user").permitAll()
                .requestMatchers("/api/books/count").permitAll()
                .requestMatchers("/api/categories/count").permitAll()
                .requestMatchers("/api/authors/count").permitAll()
                .requestMatchers("/api/books/top-rated").permitAll()
                .requestMatchers("/api/health").permitAll()
                .requestMatchers("/api/token/validate").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/authors/**", "/api/books/**", "/api/borrows/**").permitAll()
                // Endpoints específicos para ADMIN
                .requestMatchers("/api/categories/**").hasRole(SecurityConstants.ROLE_ADMIN)
                .requestMatchers("/api/auth/register").hasRole(SecurityConstants.ROLE_ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/users/**", "/api/authors/**", "/api/books/**").hasRole(SecurityConstants.ROLE_ADMIN)
                .requestMatchers(HttpMethod.PUT, "/api/users/**", "/api/authors/**", "/api/books/**").hasRole(SecurityConstants.ROLE_ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/users/**", "/api/authors/**", "/api/books/**", "/api/borrows/**").hasRole(SecurityConstants.ROLE_ADMIN)
                // Endpoints específicos para USER e ADMIN
                .requestMatchers(HttpMethod.PUT, "/api/borrows/return/id/{id}").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/borrows/check").authenticated()
                .requestMatchers("/api/borrows/user/**").hasAnyRole(SecurityConstants.ROLE_USER, SecurityConstants.ROLE_ADMIN)
                // Endpoints Owner e Admin
                .requestMatchers(HttpMethod.GET, "/api/users/id/{id}").access(new WebExpressionAuthorizationManager("@securityUtils.isOwnerOrAdmin(authentication,#id)"))
                .requestMatchers(HttpMethod.PUT, "/api/users/id/{id}").access(new WebExpressionAuthorizationManager("@securityUtils.isOwnerOrAdmin(authentication,#id)"))
                .requestMatchers(HttpMethod.DELETE, "/api/users/id/{id}").access(new WebExpressionAuthorizationManager("@securityUtils.isOwnerOrAdmin(authentication,#id)"))
                // Qualquer outra requisição deve ser autenticada
                .requestMatchers(HttpMethod.GET, "/api/users/username/{username}").authenticated()
                .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .headers(headers -> headers.frameOptions().disable())
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedSlash(true);
        return firewall;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000")); // Adicione aqui as origens permitidas
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
