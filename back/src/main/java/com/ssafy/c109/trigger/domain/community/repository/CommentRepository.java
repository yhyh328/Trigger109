package com.ssafy.c109.trigger.domain.community.repository;

import com.ssafy.c109.trigger.domain.community.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
