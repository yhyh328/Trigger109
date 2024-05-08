package com.ssafy.c109.trigger.domain.ranking.service;

import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingDetailListResponse;
import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingListResponse;

import java.util.List;

public interface RankingService {
    List<GetRankingListResponse> getRankingList();
    List<GetRankingDetailListResponse> getRankingDetailList(Long memberId);

}
