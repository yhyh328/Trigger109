package com.ssafy.c109.trigger.domain.notice.dto.response;

import java.time.LocalDate;

public record GetNoticeListResponse(
    Long noticeId,
    String noticeTitle,
    String noticeContent,
    LocalDate createdAt,
    int noticeEmergency,
    int noticeViewCnt
) {}
