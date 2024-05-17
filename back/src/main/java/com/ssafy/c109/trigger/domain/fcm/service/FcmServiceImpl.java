package com.ssafy.c109.trigger.domain.fcm.service;

import com.ssafy.c109.trigger.domain.fcm.entity.FCM;
import com.ssafy.c109.trigger.domain.fcm.repository.FcmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmServiceImpl implements FcmService{

    private final FcmRepository fcmRepository;

    @Override
    public void registerFcmToken(FCM rfcm) {
        try {
            // FCM 토큰이 이미 존재하는지 확인
            List<FCM> existingFcmTokens = fcmRepository.findByFcmToken(rfcm.getFcmToken());
            if (existingFcmTokens.isEmpty()) {
                FCM fcm = new FCM();
                fcm.setFcmToken(rfcm.getFcmToken());
                fcmRepository.save(fcm);
                log.info("새로운 FCM 토큰이 등록되었습니다: {}", rfcm.getFcmToken());
            } else {
                log.info("이미 존재하는 FCM 토큰입니다: {}", rfcm.getFcmToken());
                throw new IllegalStateException("이미 존재하는 FCM 토큰입니다.");
            }
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("FCM 토큰 등록 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("FCM 토큰 등록 중 에러가 발생했습니다.", e);
        }
    }




    @Override
    public List<FCM> getAllFcmToken() {
        try {
            List<FCM> fcmList = fcmRepository.findAll();
            return fcmList;
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("FCM 토큰을 가져오는 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("FCM 토큰을 가져오는 중 에러가 발생했습니다.");
        }
    }
}
