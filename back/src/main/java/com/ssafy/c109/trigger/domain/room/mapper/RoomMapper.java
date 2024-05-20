package com.ssafy.c109.trigger.domain.room.mapper;

import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.dto.response.RoomResponseDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomMapper MAPPER = Mappers.getMapper(RoomMapper.class);

    RoomResponseDto toRoomResponseDto(Room room);
    List<RoomResponseDto> toRoomResponseDtoList(List<Room> rooms);
}
