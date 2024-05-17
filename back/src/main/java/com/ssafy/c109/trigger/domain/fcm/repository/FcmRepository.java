package com.ssafy.c109.trigger.domain.fcm.repository;

import com.ssafy.c109.trigger.domain.fcm.entity.FCM;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FcmRepository extends JpaRepository<FCM, Long> {
    List<FCM> findByFcmToken(String fcmToken);
}
