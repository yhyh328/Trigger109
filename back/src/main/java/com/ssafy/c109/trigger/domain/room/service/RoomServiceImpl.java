import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.repository.MemberRepository; // Member를 찾기 위한 리포지토리
import com.ssafy.c109.trigger.domain.room.repository.RoomRepository;
import com.ssafy.c109.trigger.domain.room.service.RoomService;

import java.util.Optional;

public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository; // MemberRepository 추가

    public RoomServiceImpl(RoomRepository roomRepository, MemberRepository memberRepository) {
        this.roomRepository = roomRepository;
        this.memberRepository = memberRepository; // 의존성 주입
    }

    @Override
    public Room createRoom(RoomCreateRequestDto roomCreateDto) {
        Room room = new Room();
        room.setRoomTitle(roomCreateDto.getRoomTitle()); // 제목 설정
        room.setIsRoomDeleted(false); // 기본적으로 삭제되지 않은 상태로 설정

        // Member 객체 조회
        Optional<Member> optionalMember = memberRepository.findById((long) roomCreateDto.getMemberId());
        if (optionalMember.isPresent()) {
            room.setMemberId(optionalMember.get()); // 조회된 Member 설정
        } else {
            // 적절한 예외 처리 또는 로그, 혹은 다른 로직을 실행
            // 예를 들면, 존재하지 않는 회원 ID에 대해 기본 값 설정이나, null 처리 등
        }

        // 방을 데이터베이스에 저장
        return roomRepository.save(room);
    }
}
