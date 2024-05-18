// api/user.ts
import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance = localAxios();
const url = "api/v1/users";

export interface Member {
  memberId: string,
  email: string;
  name: string;
  // 필요한 추가 필드
}


// 로그인한 사용자의 정보를 가져오는 함수
export const fetchUserInfo = async (): Promise<Member> => {
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

  try {
    const response = await local.get<Member>('https://trigger109.com/api/v1/users/info', {
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


// 로그인 유무 관계 없이 모든 계정 가져오기 
async function fetchMembers() {
  if (!local) {
    throw new Error("Unable to fetch Axios instance.");
  }

  // 가져오기 -> memberId(number), nickname(string), profileImg(string? file?) 
  // isDeleted가 false라면 안 가져옴
  try {
    const response = await local.get(`${url}`);
    console.log('url', `${url}/info`)
    console.log('response', response.data)
    const membersData = Array.isArray(response.data) ? response.data : [];
    console.log('membersData => ', membersData)
    return membersData
      // .filter((member: any) => member.isDeleted) 
      .map((member: any) => ({
        id: member.memberId, 
        nickname: member.nickName, 
        image: member.profileImg 
      }));
  } catch (error) {
    console.error("Error fetching members:", error);
    throw new Error("Error occurred while fetching members.");
  }
}

export { fetchMembers }
