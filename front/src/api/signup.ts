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

// 회원가입 함수
// API 호출 함수를 수정하여 FormData를 받도록 하고, 해당 함수 내에서 FormData 객체를 생성하는 부분을 제거
export const signUpRequest = async (data: SignUpData): Promise<void> => {
    const local: AxiosInstance = localAxios();

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('nickName', data.nickName);
    formData.append('gender', data.gender);
    if (data.profileImg) {
        formData.append('profileImg', data.profileImg);
    }

    try {
        const response = await local.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Response Data:', response.data);
        alert('사용자 등록이 성공했습니다.');
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('사용자 등록에 실패했습니다.');
    }
};

// const url = "https://trigger109.com/api/v1/users/signup";
const url = "http://localhost:8080/api/v1/users/signup";

// SignUp 함수 내부에서 SignUpData 객체 생성 및 signUpRequest 함수 호출
const signUp = async (email: string, password: string, nickName: string, gender: Gender, profileImg: File | null): Promise<void> => {
    const signUpData: SignUpData = {
        email: email,
        password: password,
        nickName: nickName,
        gender: gender,
        profileImg: profileImg
    };

    await signUpRequest(signUpData);
};
