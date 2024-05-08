package com.ssafy.c109.trigger.domain.record.service;

import com.ssafy.c109.trigger.domain.record.dto.response.GetRecordListResponse;

import java.util.List;

public interface RecordService {
    List<GetRecordListResponse> getRecordList();

}
