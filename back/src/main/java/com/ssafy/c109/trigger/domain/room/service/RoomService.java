package com.ssafy.c109.trigger.domain.room.service;

import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomService {
    Room createRoom(RoomCreateRequestDto roomCreateDto);
    List<Room> getAllRoomInfo();
    Room getAllUserRoomInfo(String email);
    void deleteRoom(Long roomId);

}
