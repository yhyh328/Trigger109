package com.ssafy.c109.trigger.domain.record.controller;

import com.ssafy.c109.trigger.domain.record.dto.response.GetRecordListResponse;
import com.ssafy.c109.trigger.domain.record.mapper.RecordMapper;
import com.ssafy.c109.trigger.domain.record.service.RecordService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/record")
public class RecordController {

    private final RecordService recordService;

    @GetMapping
    public ResponseEntity<?> getRecordList(){
        List<GetRecordListResponse> getRecordListResponses = recordService.getRecordList();
        if(getRecordListResponses.isEmpty()){
            String errorMessage = "랭킹 목록을 가져오지 못했습니다.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } else {
            return ResponseEntity.ok(getRecordListResponses);
        }
    }

}
