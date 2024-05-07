package com.ssafy.c109.trigger.domain.notice.service;

import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import com.ssafy.c109.trigger.domain.notice.entity.Notice;
import com.ssafy.c109.trigger.domain.notice.mapper.NoticeMapper;
import com.ssafy.c109.trigger.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeMapper noticeMapper;
    @Override
    public List<GetNoticeListResponse> getNoticeList() {
        try {
            List<Notice> getNoticeList = noticeRepository.findAll();
            List<GetNoticeListResponse> getNoticeListResponseList = noticeMapper.toGetNoticeListResponse(getNoticeList);
            if(getNoticeListResponseList.isEmpty()){
                throw new RuntimeException("공지사항이 존재하지 않습니다.");
            }
            return getNoticeListResponseList;
        }catch (Exception e){
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 목록을 불러오는 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공지사항 목록을 불러오는 중 에러 발생했습니다.");
        }
    }
}
