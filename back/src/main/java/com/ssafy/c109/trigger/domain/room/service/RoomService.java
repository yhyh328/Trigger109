package com.ssafy.c109.trigger.domain.room.service;

import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;
import org.springframework.stereotype.Service;

@Service
public interface RoomService {
    Room createRoom(RoomCreateRequestDto roomCreateDto);
    Room getAllRoomInfo(String email);
    void deleteRoom(Long roomId);

}
