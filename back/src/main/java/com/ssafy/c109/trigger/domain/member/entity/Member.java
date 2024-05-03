package com.ssafy.c109.trigger.domain.member.entity;

import com.ssafy.c109.trigger.global.jpaEnum.Gender;
import com.ssafy.c109.trigger.global.jpaEnum.Role;
import com.ssafy.c109.trigger.global.jpaEnum.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
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

}
