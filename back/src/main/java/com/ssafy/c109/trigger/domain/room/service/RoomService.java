package com.ssafy.c109.trigger.domain.room.service;

import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;

public interface RoomService {
    Room createRoom(RoomCreateRequestDto roomCreateDto);

}
