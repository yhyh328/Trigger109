import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";


const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/fcm";


export type FCM = {
    fcmId: number;
    fcmToken: string;
}


export type FCMList = [];


async function getFCMs(): Promise<FCMList[]>{
    if (!local) {
        throw new Error("Unable to create Axios instance.");
    }
    try {
    const response = await local.get(`${url}`);
    return response.data;
    } catch (error) {
    console.error("Error getting notifications:", error);
    throw new Error("Error occurred while getting the fcm tokens.");
    }
}


async function postFCM(fcm: FCM): Promise<void> {
    if (!local) {
        throw new Error("Unable to create Axios instance.");
      }
    const formData = new FormData();
    formData.append('fcmToken', fcm.fcmToken);

    const token: string | null = localStorage.getItem('token');
    local.defaults.headers.Authorization = "Bearer " + token;

    try {
        await local.post(`${url}/register`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error posting fcm token", error);
        throw new Error("Error occured while posting the fcm token")
    }
}

export { getFCMs, postFCM }
