package com.ssafy.c109.trigger.global.jpaEnum;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    admin("ROLE_ADMIN"),
    gamer("ROLE_GAMER"),
//    GUEST("ROLE_GUEST"),
    USER("ROLE_USER");
    private final String key;
}
