package com.ssafy.c109.trigger.domain.community.repository;

import com.ssafy.c109.trigger.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
