package com.ssafy.c109.trigger.domain.member.entity;

import com.ssafy.c109.trigger.global.jpaEnum.Gender;
import com.ssafy.c109.trigger.global.jpaEnum.Role;
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

    public Member() {

    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

}
