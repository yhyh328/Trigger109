package com.ssafy.c109.trigger.domain.ranking.controller;

import com.ssafy.c109.trigger.domain.ranking.dto.response.GetRankingListResponse;
import com.ssafy.c109.trigger.domain.ranking.service.RankingService;
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
@RequestMapping("/api/v1/ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<?> getRankingList(){
        List<GetRankingListResponse> getRankingListResponses = rankingService.getRankingList();
        if(getRankingListResponses.isEmpty()){
            String errorMessage = "랭킹 목록을 가져오지 못했습니다.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } else {
            return ResponseEntity.ok(getRankingListResponses);
        }
    }



}
