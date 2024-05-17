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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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

    @GetMapping("/allInfo")
    public ResponseEntity<?> getAllRoomInfo(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Room room = roomService.getAllRoomInfo(email);

            if (room == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("방을 찾을 수 없습니다");
            }

            RoomResponseDto roomResponseDto = RoomMapper.MAPPER.toRoomResponseDto(room);
            return ResponseEntity.ok(roomResponseDto);

        } catch (Exception e) {
            log.error("사용자 정보로 방 정보를 가져오는 중 오류 발생: {}", authentication.getName(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("방 정보를 가져오는 중 오류가 발생했습니다");
        }
    }

    @PostMapping()
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

