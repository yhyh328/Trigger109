package com.ssafy.c109.trigger.domain.notice.service;

import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;

import java.util.List;

public interface NoticeService {
    List<GetNoticeListResponse> getNoticeList();
}
