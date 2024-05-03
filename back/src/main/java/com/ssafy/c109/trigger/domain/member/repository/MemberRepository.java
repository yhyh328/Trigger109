package com.ssafy.c109.trigger.domain.member.repository;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickName(String nickname);
    Optional<Member> findByRefreshToken(String refreshToken);
}
