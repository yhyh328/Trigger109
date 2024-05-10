package com.ssafy.c109.trigger.domain.room.dto.response;

import com.ssafy.c109.trigger.domain.member.dto.request.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDto {
    private Long roomId;
    private String roomTitle;
    private Boolean isRoomDeleted;
    private MemberDto member;  // 간략한 멤버 정보만 포함
}
