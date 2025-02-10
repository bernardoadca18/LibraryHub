package com.bookstore_manager.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore_manager.backend.dto.HealthCheckResponse;

@RestController
@RequestMapping(value = "/api")
public class HealthCheckController {

    @Value("${app.version:1.0.0}")
    private String appVersion;

    @GetMapping("/health")
    public ResponseEntity<HealthCheckResponse> healthCheck() {
        HealthCheckResponse response = new HealthCheckResponse("UP", appVersion);
        return ResponseEntity.ok(response);
    }
}
