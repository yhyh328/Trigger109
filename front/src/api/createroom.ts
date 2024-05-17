import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

export interface RoomCreateRequestDto {
    memberId: string;  // 방을 생성하는 멤버의 ID
    roomTitle: string;     // 스트리밍 방의 제목
    // 추가 필요한 필드는 여기에 선언
  }

const createRoomUrl = "https://trigger109.com/api/v1/live";

// 방 생성 함수
export const createRoom = async (memberId: string, roomData: RoomCreateRequestDto): Promise<any> => {
    const local: AxiosInstance = localAxios();
    const token = localStorage.getItem('token');
    console.log("token", token)
    try {
        const response = await local.post(createRoomUrl, JSON.stringify(roomData), {
            headers: {
                'Authorization': `Bearer ${token}` // 요청 헤더에 인증 토큰 추가
              },
        });

        // 방 생성 성공 시, 서버로부터 반환된 방 정보
        const roomInfo = response.data;
        console.log('Room created successfully:', roomInfo);
        return roomInfo;
    } catch (error) {
        console.error('Error during room creation:', error);
        throw error; // 상위 컴포넌트에서 에러 처리를 할 수 있도록 에러를 던짐
    }
};