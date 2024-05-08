package com.ssafy.c109.trigger.domain.room.service;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.repository.MemberRepository; // Member를 찾기 위한 리포지토리
import com.ssafy.c109.trigger.domain.room.dto.request.RoomCreateRequestDto;
import com.ssafy.c109.trigger.domain.room.entity.Room;
import com.ssafy.c109.trigger.domain.room.repository.RoomRepository;
import com.ssafy.c109.trigger.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Repository
@RequiredArgsConstructor
@Log4j2
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository; // MemberRepository 추가


    @Override
    public Room createRoom(RoomCreateRequestDto roomCreateDto) {
        Room room = new Room();
        room.setRoomTitle(roomCreateDto.getRoomTitle()); // 제목 설정
        room.setIsRoomDeleted(false); // 기본적으로 삭제되지 않은 상태로 설정
        room = roomRepository.save(room);
        log.info("Room created: {}", room); // 로그에 room 객체 상태 출력

        // Member 객체 조회
        Optional<Member> optionalMember = memberRepository.findById((long) roomCreateDto.getMemberId());
        if (optionalMember.isPresent()) {
            room.setMember(optionalMember.get()); // 조회된 Member 설정
        } else {
            log.warn("Member not found with ID: {}", roomCreateDto.getMemberId());
            throw new IllegalArgumentException("Member not found with ID: " + roomCreateDto.getMemberId());
        }

        // 방을 데이터베이스에 저장
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new IllegalArgumentException("Room not found with ID: " + roomId);
        }
        roomRepository.deleteById(roomId);
    }
}