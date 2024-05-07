package com.ssafy.c109.trigger.domain.room.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateRequestDto {
    private Long memberId;

    private String roomTitle;

    private Boolean isRoomDeleted;
}
