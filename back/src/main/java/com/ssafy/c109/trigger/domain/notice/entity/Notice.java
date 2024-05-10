package com.ssafy.c109.trigger.domain.notice.entity;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @ManyToOne()
    @JoinColumn(name = "member_id")
    private Member member;

    private String noticeTitle;

    private String noticeContent;

    private LocalDate noticeCreatedAt;

    private int noticeEmergency;

    private int noticeViewCnt;

    private String noticeImg;

}
