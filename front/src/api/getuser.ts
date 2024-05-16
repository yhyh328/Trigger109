// api/user.ts
import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

export interface Member {
  memberId: string,
  email: string;
  name: string;
  // 필요한 추가 필드
}

// 로그인한 사용자의 정보를 가져오는 함수
export const fetchUserInfo = async (): Promise<Member> => {
  const local: AxiosInstance = localAxios();
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

  try {
    const response = await local.get<Member>('http://localhost:8080/api/v1/users/info', {
      headers: {
        'Authorization': `Bearer ${token}` // 요청 헤더에 인증 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
