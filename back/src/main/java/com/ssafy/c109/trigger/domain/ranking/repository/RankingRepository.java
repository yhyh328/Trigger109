package com.ssafy.c109.trigger.domain.ranking.repository;

import com.ssafy.c109.trigger.domain.ranking.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
    @Query("SELECT r FROM Ranking r WHERE r.rankingId IN (SELECT MAX(r2.rankingId) FROM Ranking r2 GROUP BY r2.member.id) ORDER BY r.rating DESC")
    List<Ranking> getLatestRankingsOrderByRatingDesc();

    List<Ranking> findByMember_Email(String email);
}
