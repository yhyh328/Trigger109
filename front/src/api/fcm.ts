import axios, { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/fcm";

export type FCM = {
  fcmId?: number;
  fcmToken: string;
};

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

  const token: string | null = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    await local.post(`${url}/register`, { fcmToken: fcm.fcmToken }, { headers });
    console.log('FCM token posted successfully');
  } catch (error) {
    console.error("Error posting FCM token", error);
    throw new Error("Error occurred while posting the FCM token");
  }
}

export { getFCMs, postFCM };
