package com.ssafy.c109.trigger.domain.member.dto.request;

import com.ssafy.c109.trigger.global.jpaEnum.Gender;

public record SignUpRequest(
        String email,

        String password,

        String nickName,

        Gender gender

//        MultipartFile profileImg
)
{}
