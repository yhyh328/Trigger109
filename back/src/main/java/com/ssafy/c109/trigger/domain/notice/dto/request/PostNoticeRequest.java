package com.ssafy.c109.trigger.domain.notice.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record PostNoticeRequest(
        String noticeTitle,
        String noticeContent,
        int noticeEmergency, // default 0
        int noticeViewCnt, // default 0
        String noticeImg
) {}

