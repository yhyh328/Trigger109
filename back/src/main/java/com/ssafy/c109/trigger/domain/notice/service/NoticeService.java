package com.ssafy.c109.trigger.domain.notice.service;

import com.ssafy.c109.trigger.domain.notice.dto.request.PostNoticeRequest;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeDetailResponse;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import java.util.List;

public interface NoticeService {
    List<GetNoticeListResponse> getNoticeList();
    GetNoticeDetailResponse getNoticeDetail(Long noticeId);
    void postNotice(String email, PostNoticeRequest postNoticeRequest);

}
