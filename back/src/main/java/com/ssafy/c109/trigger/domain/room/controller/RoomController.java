package com.ssafy.c109.trigger.domain.room.controller;

import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.dto.response.RoomResponseDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;
import com.ssafy.c109.trigger.domain.room.mapper.RoomMapper;
import com.ssafy.c109.trigger.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@ToString
@RequestMapping("/api/v1/live")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("{memberId}")
    public ResponseEntity<RoomResponseDto> createRoom(@RequestBody RoomCreateRequestDto roomCreateRequestDto) {
        Room room = roomService.createRoom(roomCreateRequestDto);
        RoomResponseDto roomResponseDto = RoomMapper.MAPPER.toRoomResponseDto(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponseDto);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }

}

