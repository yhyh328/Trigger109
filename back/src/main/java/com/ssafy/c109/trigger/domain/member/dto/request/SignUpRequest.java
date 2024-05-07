package com.ssafy.c109.trigger.domain.member.dto.request;

import com.ssafy.c109.trigger.global.jpaEnum.Gender;
import lombok.Getter;

public record SignUpRequest(
        String email,

        String password,

        String nickName,

        Gender gender

//        MultipartFile profileImg
)
{}
