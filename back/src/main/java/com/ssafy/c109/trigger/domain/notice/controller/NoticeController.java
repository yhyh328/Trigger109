package com.ssafy.c109.trigger.domain.notice.controller;

import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeDetailResponse;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import com.ssafy.c109.trigger.domain.notice.service.NoticeService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Data
@RequiredArgsConstructor
@RequestMapping("/api/v1/notice")
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<?> getNoticeList(){
        List<GetNoticeListResponse> getNoticeListResponses = noticeService.getNoticeList();
        if (getNoticeListResponses.isEmpty()) {
            String errorMessage = "공지사항 목록을 가져오지 못했습니다.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } else {
            return ResponseEntity.ok(getNoticeListResponses);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getNoticeDetail(@RequestParam Long noticeId) {
        GetNoticeDetailResponse getNoticeDetailResponse = noticeService.getNoticeDetail(noticeId);
        if (getNoticeDetailResponse == null) {
            String errorMessage = "해당하는 공지사항을 찾을 수 없습니다.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } else {
            return ResponseEntity.ok(getNoticeDetailResponse);
        }
    }
}
