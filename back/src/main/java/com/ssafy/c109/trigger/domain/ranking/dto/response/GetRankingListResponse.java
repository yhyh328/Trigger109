package com.ssafy.c109.trigger.domain.ranking.dto.response;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import lombok.Setter;

public record GetRankingListResponse(
   String nickName,
   int isWin,
   int rating,
   int killCnt,
   int death,
   Member member

) {}
