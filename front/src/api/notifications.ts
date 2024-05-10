// Import Axios types for better type annotations
import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/notice";

export type Notice = {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeImg?: string | null | undefined;
};

export type Notices = [];

async function postNotification(notice: Notice): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }

  try {
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   local.defaults.headers.Authorization = `Bearer ${accessToken}`;
    // }

    await local.post(`${url}/register`, JSON.stringify(notice));
  } catch (error) {
    console.error("Error posting notification:", error);
    throw new Error("Error occurred while posting the notification.");
  }
};

async function getNotificationList(): Promise<Notices[]> {
    if (!local) {
      throw new Error("Unable to create Axios instance.");
    }
  
    try {
    //   const accessToken = localStorage.getItem("accessToken");
    //   if (accessToken) {
    //     local.defaults.headers.Authorization = `Bearer ${accessToken}`;
    //   }
  
      const response = await local.get(`${url}`);
      return response.data;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw new Error("Error occurred while getting the notifications.");
    }
};

async function getNotificationDetail(noticeId: string): Promise<Notice> {
    if (!local) {
      throw new Error("Unable to create Axios instance.");
    }
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        local.defaults.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      const response = await local.get(`${url}/${noticeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting notification detail for ID: ${noticeId}`, error);
      throw new Error(`Error occurred while getting the notification with ID: ${noticeId}`);
    }
  };

export { postNotification, getNotificationList, getNotificationDetail };
