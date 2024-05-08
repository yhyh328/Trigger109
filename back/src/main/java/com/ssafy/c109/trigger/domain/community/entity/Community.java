package com.ssafy.c109.trigger.domain.community.entity;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@RequiredArgsConstructor
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String communityTitle;

    private String communityContent;

    private LocalDate communityCreatedAt;

    private int communityViewCnt;
}
