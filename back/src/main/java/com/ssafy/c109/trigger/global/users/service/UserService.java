package com.ssafy.c109.trigger.global.users.service;

import com.ssafy.c109.trigger.global.admin.repository.RoleRepository;
import com.ssafy.c109.trigger.global.domain.entity.Account;
import com.ssafy.c109.trigger.global.domain.entity.Role;
import com.ssafy.c109.trigger.global.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Transactional
    public void createUser(Account account){
        Role role = roleRepository.findByRoleName("ROLE_USER");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        account.setUserRoles(roles);
        userRepository.save(account);
    }

}