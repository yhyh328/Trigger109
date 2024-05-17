package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    void singUp(SignUpRequest signUpRequest) throws Exception;
    Member getAllMemberInfo(String email);
}
