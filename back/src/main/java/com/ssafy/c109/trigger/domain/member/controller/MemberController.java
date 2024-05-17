package com.ssafy.c109.trigger.domain.member.controller;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.service.MemberService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10,      // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB
public class MemberController {

    private final MemberService memberService;
    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
    @PostMapping(value = "/signup")
    public ResponseEntity<?> signUp(@ModelAttribute SignUpRequest signUpRequest,
                                    @RequestParam(value = "profileImg", required = false) MultipartFile profileImg) {
        log.info("signUpRequest : " + signUpRequest);
        log.info("profileImg : " + profileImg);
        try {
            memberService.singUp(signUpRequest,profileImg);
            return ResponseEntity.ok("사용자 등록이 성공했습니다.");
        } catch (Exception e) {
            log.error("사용자 등록 중 오류가 발생했습니다: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 등록에 실패했습니다.");
        }
    }
    @GetMapping("/info")
    public ResponseEntity<Member> getAllMemberInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        try {
            Member member = memberService.getAllMemberInfo(email);
            return ResponseEntity.ok(member);
        } catch (Exception e) {
            log.error("사용자 정보 가져오는 중 오류가 발생했습니다: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}

