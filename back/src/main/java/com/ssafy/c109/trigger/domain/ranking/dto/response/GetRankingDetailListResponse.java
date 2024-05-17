package com.ssafy.c109.trigger.domain.ranking.dto.response;

public record GetRankingDetailListResponse(
   int memberId,
   String nickName,
   int isWin,
   int killCount,
   int death,
   String createdAt,
   int rating

) {}
