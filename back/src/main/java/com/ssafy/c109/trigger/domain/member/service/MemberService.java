package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;

public interface MemberService {
    void singUp(SignUpRequest signUpRequest) throws Exception;
}
