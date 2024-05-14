package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    void singUp(SignUpRequest signUpRequest, MultipartFile profileImg) throws Exception;
}
