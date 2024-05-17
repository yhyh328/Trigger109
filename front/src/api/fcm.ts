import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/fcm";

export type FCM = {
  fcmId: number;
  fcmToken: string;
}

export type FCMList = FCM[];

async function getFCMs(): Promise<FCM[]> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error("Error getting FCM tokens:", error);
    throw new Error("Error occurred while getting the FCM tokens.");
  }
}

async function postFCM(fcm: FCM): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  const formData = new FormData();
  formData.append('fcmToken', fcm.fcmToken);

  const token: string | null = localStorage.getItem('token');
  if (token) {
    local.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    await local.post(`${url}/register`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(formData)
  } catch (error) {
    console.error("Error posting FCM token", error);
    throw new Error("Error occurred while posting the FCM token");
  }
}

export { getFCMs, postFCM };
