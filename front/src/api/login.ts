import { AxiosInstance, AxiosError } from "axios";
import { localAxios } from "../util/http-commons";

export type LoginData = {
  email: string;
  password: string;
};

const loginUrl = "https://trigger109.com/api/v1/users/login";
// const loginUrl = "http://localhost:8080/api/v1/users/login";

// 로그인 함수
export const login = async (loginData: LoginData): Promise<string | null> => {
    const local: AxiosInstance = localAxios();

    try {
        const response = await local.post(loginUrl, JSON.stringify(loginData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 'Authorization' 헤더에서 토큰 접근
        const token = response.headers['authorization'];
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token received and stored:', token);
            return token;
        } else {
            console.error('No token in response headers');
            return null;
        }
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
};