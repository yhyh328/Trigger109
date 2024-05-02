package com.ssafy.c109.trigger.global.admin.service;



import com.ssafy.c109.trigger.global.domain.entity.Resources;

import java.util.List;

public interface ResourcesService {
    Resources getResources(long id);
    List<Resources> getResources();

    void createResources(Resources Resources);

    void deleteResources(long id);
}
