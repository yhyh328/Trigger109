package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {
    void singUp(SignUpRequest signUpRequest, MultipartFile profileImg) throws Exception;
    Member getMemberInfo(String email);
    List<Member> getAllMemberInfo();
}
