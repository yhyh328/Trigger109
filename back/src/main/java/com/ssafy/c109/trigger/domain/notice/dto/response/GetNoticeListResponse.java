package com.ssafy.c109.trigger.domain.notice.dto.response;

import java.time.LocalDate;

public record GetNoticeListResponse(
    Long noticeId,
    String noticeTitle,
    String noticeContent,
    LocalDate noticeCreatedAt,
    int noticeEmergency,
    int noticeViewCnt,
    String noticeImg
) {}
