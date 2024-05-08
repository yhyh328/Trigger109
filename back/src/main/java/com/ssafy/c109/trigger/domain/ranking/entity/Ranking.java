package com.ssafy.c109.trigger.domain.ranking.entity;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankingId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int isWin;

    private int killCnt;

    private int death;

    private LocalDate createdAt;

    private Long rating;
}
