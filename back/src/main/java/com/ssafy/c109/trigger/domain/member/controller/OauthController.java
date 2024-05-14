package com.ssafy.c109.trigger.domain.member.controller;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/oauth2/code")
public class OauthController {


    private final MemberService memberService;
    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
    @GetMapping("/kakao")
    public String kakaoTest(){
        return "kakao 로그인 성공!!!";
    }
    @GetMapping("/google")
    public String googleTest(){
        return "google 로그인 성공!!!";
    }
    @GetMapping("/naver")
    public String naverTest(){
        return "naver 로그인 성공!!!";
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest, MultipartFile profileImg) {
        log.info("signUpRequest : " + signUpRequest);
        try {
            memberService.singUp(signUpRequest,profileImg);
            return ResponseEntity.ok("사용자 등록이 성공했습니다.");
        } catch (Exception e) {
            log.error("사용자 등록 중 오류가 발생했습니다: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 등록에 실패했습니다.");
        }
    }

}
