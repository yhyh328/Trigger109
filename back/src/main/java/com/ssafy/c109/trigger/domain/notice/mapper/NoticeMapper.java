package com.ssafy.c109.trigger.domain.notice.mapper;

import com.ssafy.c109.trigger.domain.notice.dto.request.PostNoticeRequest;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeDetailResponse;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import com.ssafy.c109.trigger.domain.notice.entity.Notice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    NoticeMapper MAPPER = Mappers.getMapper(NoticeMapper.class);
    //Entity -> DTO
    List<GetNoticeListResponse> toGetNoticeListResponse(List<Notice> noticeList);
    GetNoticeDetailResponse toGetNoticeDetailResponse(Notice noticeDetail);
}
