package com.pg.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordRequest {
    String email;
    String password;
}