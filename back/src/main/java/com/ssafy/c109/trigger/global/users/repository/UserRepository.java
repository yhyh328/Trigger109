package com.ssafy.c109.trigger.global.users.repository;

import com.ssafy.c109.trigger.global.domain.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Account, Long> {
    Account findByUsername(String username);

}
