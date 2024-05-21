package com.ssafy.c109.trigger.domain.notice.controller;

import com.ssafy.c109.trigger.domain.notice.dto.request.PostNoticeRequest;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeDetailResponse;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import com.ssafy.c109.trigger.domain.notice.service.NoticeService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/notice")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10,      // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB
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

    @GetMapping("/cnt")
    public ResponseEntity<Void> updateViewCnt(@RequestParam Long noticeId){
        try {
            noticeService.updateViewCnt(noticeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 조회수 업데이트 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> postNotice(Authentication authentication,
                                       @ModelAttribute PostNoticeRequest postNoticeRequest,
                                       @RequestParam(value = "noticeImg",required = false)
                                           MultipartFile noticeImg){
        log.info("noticeImg : " + noticeImg);
        log.info("postNoticeRequest : " + postNoticeRequest);
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        else if (postNoticeRequest == null || postNoticeRequest.noticeTitle() == null || postNoticeRequest.noticeContent() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        else {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            noticeService.postNotice(email,postNoticeRequest,noticeImg);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
    }
}
