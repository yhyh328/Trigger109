package com.ssafy.c109.trigger.global.admin.repository;

import com.ssafy.c109.trigger.global.domain.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserManagementRepository extends JpaRepository<Account, Long> { }
