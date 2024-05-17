package com.ssafy.c109.trigger.domain.fcm.controller;

import com.ssafy.c109.trigger.domain.fcm.entity.FCM;
import com.ssafy.c109.trigger.domain.fcm.service.FcmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/fcm")
public class FcmController {

    private final FcmService fcmService;

    @GetMapping
    public ResponseEntity<?> getAllFcmToken(){
        try {
            List<FCM> fcmList = fcmService.getAllFcmToken();
            if (fcmList.isEmpty()) {
                String errorMessage = "FCM 토큰을 가져오지 못했습니다.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
            } else {
                return ResponseEntity.ok(fcmList);
            }
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("FCM 토큰을 가져오는 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FCM 토큰을 가져오는 중 에러가 발생했습니다.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerFcmToken(@RequestBody FCM fcm){
        try {
            fcmService.registerFcmToken(fcm);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("FCM 토큰 등록 중 에러 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
