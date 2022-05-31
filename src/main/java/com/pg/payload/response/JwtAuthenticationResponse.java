package com.pg.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
    private String accessToken;
    private String reresthToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken, String reresthToken) {
        this.accessToken = accessToken;
        this.reresthToken = reresthToken;
    }
}