import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

// 회원가입 요청 데이터 타입
export type Gender = 'MALE' | 'FEMALE';

export type SignUpData = {
  email: string;
  password: string;
  nickName: string;
  gender: Gender;
  profileImg: File | null;
};

const url = "https://trigger109/api/v1/users/signup";

// 회원가입 함수
// API 호출 함수를 수정하여 FormData를 받도록 하고, 해당 함수 내에서 FormData 객체를 생성하는 부분을 제거
export const signUp = async (formData: FormData): Promise<void> => {
    const local: AxiosInstance = localAxios();

    const jsonData: any = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        const response = await local.post(url, JSON.stringify(jsonData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response Data:', response.data);
        alert('사용자 등록이 성공했습니다.');
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('사용자 등록에 실패했습니다.');
    }
};
