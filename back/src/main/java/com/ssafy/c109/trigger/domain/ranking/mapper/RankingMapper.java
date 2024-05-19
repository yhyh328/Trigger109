package com.ssafy.c109.trigger.domain.ranking.mapper;

import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingDetailListResponse;
import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingListResponse;
import com.ssafy.c109.trigger.domain.ranking.entity.Ranking;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RankingMapper {
    RankingMapper MAPPER = Mappers.getMapper(RankingMapper.class);

    List<GetRankingListResponse> toGetRankingListResponse(List<Ranking> rankingList);

    List<GetRankingDetailListResponse> toGetRankingDetailListResponses(List<Ranking> rankingList);

    GetRankingListResponse toGetRankingListResponse(Ranking ranking);

}
