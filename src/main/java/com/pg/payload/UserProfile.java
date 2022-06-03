package com.pg.payload;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserProfile {

    private Long id;
    private String nickname;
    private String email;




    public UserProfile(Long id, String nickname, String email) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;

    }
}