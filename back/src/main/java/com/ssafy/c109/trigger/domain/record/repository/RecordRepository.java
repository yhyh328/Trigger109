package com.ssafy.c109.trigger.domain.record.repository;

import com.ssafy.c109.trigger.domain.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
