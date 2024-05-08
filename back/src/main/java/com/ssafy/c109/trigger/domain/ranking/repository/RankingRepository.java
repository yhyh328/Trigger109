package com.ssafy.c109.trigger.domain.ranking.repository;

import com.ssafy.c109.trigger.domain.ranking.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
}
