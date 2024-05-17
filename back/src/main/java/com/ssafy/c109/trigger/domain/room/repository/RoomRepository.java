package com.ssafy.c109.trigger.domain.room.repository;

import com.ssafy.c109.trigger.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByMember_Email(String email);
    Room findByMember_MemberId(Long memberId);
    List<Room> findAll();

}
