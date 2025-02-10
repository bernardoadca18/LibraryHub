package com.bookstore_manager.backend.dto;

public class HealthCheckResponse {

    private final String status;
    private final String version;

    public HealthCheckResponse(String status, String version) {
        this.status = status;
        this.version = version;
    }

    // Getters
    public String getStatus() {
        return status;
    }

    public String getVersion() {
        return version;
    }
}
