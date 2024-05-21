package com.ssafy.c109.trigger.domain.member.entity;

import com.ssafy.c109.trigger.global.jpaEnum.Gender;
import com.ssafy.c109.trigger.global.jpaEnum.Role;
import com.ssafy.c109.trigger.global.jpaEnum.SocialType;
import com.ssafy.c109.trigger.global.jpaEnum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String password;

    private String nickName;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Long level;

    private LocalDate createdAt;

    private String profileImg;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "boolean default false") // isDeleted 필드의 기본값을 false로 설정
    private boolean isDeleted;

    private String refreshToken; // 리프레시 토큰

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    public Member() {

    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

}
