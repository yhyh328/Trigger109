package com.ssafy.c109.trigger.global.admin.service;


import com.ssafy.c109.trigger.global.domain.entity.Role;

import java.util.List;

public interface RoleService {
    Role getRole(long id);
    List<Role> getRoles();
    List<Role> getRolesWithoutExpression();

    void createRole(Role role);

    void deleteRole(long id);
}
