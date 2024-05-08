package com.ssafy.c109.trigger.domain.notice.repository;

import com.ssafy.c109.trigger.domain.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Notice findByNoticeId(Long noticeId);
}
