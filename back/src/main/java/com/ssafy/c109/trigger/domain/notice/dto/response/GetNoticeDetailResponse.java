package com.ssafy.c109.trigger.domain.notice.dto.response;

import java.time.LocalDate;

public record GetNoticeDetailResponse(
        Long noticeId,
        String noticeTitle,
        String noticeContent,
        LocalDate noticeCreatedAt,
        int noticeViewCnt,
        String noticeImg
)
{}
