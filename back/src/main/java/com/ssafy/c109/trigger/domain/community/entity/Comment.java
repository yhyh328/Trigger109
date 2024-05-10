package com.ssafy.c109.trigger.domain.community.entity;

import com.ssafy.c109.trigger.domain.community.entity.Community;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@RequiredArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    private String commentContent;

    private LocalDate createdAt;

    private boolean isDeleted;
}
