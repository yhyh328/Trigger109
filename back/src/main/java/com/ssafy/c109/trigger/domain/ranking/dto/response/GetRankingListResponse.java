package com.ssafy.c109.trigger.domain.ranking.dto.response;

public record GetRankingListResponse(
   String nickName,
   int isWin,
   int rating

) {}
