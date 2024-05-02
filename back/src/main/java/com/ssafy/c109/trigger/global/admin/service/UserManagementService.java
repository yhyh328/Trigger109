package com.ssafy.c109.trigger.global.admin.service;


import com.ssafy.c109.trigger.global.domain.dto.AccountDto;
import com.ssafy.c109.trigger.global.domain.entity.Account;

import java.util.List;

public interface UserManagementService {

    void modifyUser(AccountDto accountDto);

    List<Account> getUsers();
    AccountDto getUser(Long id);

    void deleteUser(Long idx);

}
