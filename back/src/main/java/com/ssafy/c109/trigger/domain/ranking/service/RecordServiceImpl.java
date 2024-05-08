package com.ssafy.c109.trigger.domain.ranking.service;

import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingListResponse;
import com.ssafy.c109.trigger.domain.ranking.entity.Ranking;
import com.ssafy.c109.trigger.domain.ranking.mapper.RankingMapper;
import com.ssafy.c109.trigger.domain.ranking.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecordServiceImpl implements RankingService{

    private final RankingRepository rankingRepository;
    private final RankingMapper rankingMapper;

    @Override
    public List<GetRankingListResponse> getRankingList() {
        try{
            List<Ranking> getRankingdList = rankingRepository.findAll();
            List<GetRankingListResponse> getRecordListResponses = rankingMapper.toGetRankingListResponse(getRankingdList);
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
