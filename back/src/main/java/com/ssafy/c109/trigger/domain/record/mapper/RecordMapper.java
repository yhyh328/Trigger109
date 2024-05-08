package com.ssafy.c109.trigger.domain.record.mapper;

import com.ssafy.c109.trigger.domain.record.dto.response.GetRecordListResponse;
import com.ssafy.c109.trigger.domain.record.entity.Record;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecordMapper {
    RecordMapper MAPPER = Mappers.getMapper(RecordMapper.class);

    List<GetRecordListResponse> toGetRecordListResponse(List<Record> recordList);


}
