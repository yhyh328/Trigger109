package com.ssafy.c109.trigger.domain.room.entity;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(name = "room_title", length = 50, nullable = false)
    private String roomTitle;

    @Column(name = "is_room_deleted")
    private Boolean isRoomDeleted = false; // 초기값: false

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "memberId")
    private Member memberId; // Member 엔티티를 참조하는 외래키
}
