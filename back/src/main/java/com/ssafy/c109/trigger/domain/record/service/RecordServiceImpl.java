package com.ssafy.c109.trigger.domain.record.service;

import com.ssafy.c109.trigger.domain.record.dto.response.GetRecordListResponse;
import com.ssafy.c109.trigger.domain.record.entity.Record;
import com.ssafy.c109.trigger.domain.record.mapper.RecordMapper;
import com.ssafy.c109.trigger.domain.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final RecordRepository recordRepository;
    private final RecordMapper recordMapper;

    @Override
    public List<GetRecordListResponse> getRecordList() {
        try{
            List<Record> getRecordList = recordRepository.findAll();
            List<GetRecordListResponse> getRecordListResponses = recordMapper.toGetRecordListResponse(getRecordList);
            if(getRecordListResponses.isEmpty()){
                throw new RuntimeException("랭킹 목록이 존재하지 않습니다.");
            }
            return getRecordListResponses;
        }catch (Exception e){
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("랭킹 목록을 불러오는 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("랭킹 목록을 불러오는 중 에러 발생했습니다.");
        }
    }
}
