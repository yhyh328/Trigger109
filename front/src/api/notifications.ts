import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";
import axios from "axios";
import { FCMList, getFCMs } from "./fcm";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/notice";

export type Notice = {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeImg?: File | string;
  noticeEmergency: number;
  noticeViewCnt: number;
  noticeCreatedAt: string;
};

export type Notices = [];

async function postNotification(notice: Notice): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }

  const token: string | null = localStorage.getItem('token');
  if (token) {
    local.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const formData = new FormData();
    formData.append("noticeTitle", notice.noticeTitle);
    formData.append("noticeContent", notice.noticeContent);
    if (notice.noticeImg) {
      formData.append("noticeImg", notice.noticeImg);
    }
    formData.append("noticeEmergency", String(notice.noticeEmergency));
    formData.append("noticeViewCnt", String(notice.noticeViewCnt));
    formData.append("noticeCreatedAt", notice.noticeCreatedAt);

    console.log('FormData - noticeTitle:', formData.get("noticeTitle"));
    console.log('FormData - noticeContent:', formData.get("noticeContent"));
    console.log('FormData - noticeEmergency:', formData.get("noticeEmergency"));
    console.log('FormData - noticeViewCnt:', formData.get("noticeViewCnt"));
    console.log('FormData - noticeCreatedAt:', formData.get("noticeCreatedAt"));
    console.log('FormData - noticeImg:', formData.get("noticeImg"));

    const response = await local.post(`${url}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Server response:', response.data);

    // const fcmTokens = await getFCMs() as FCMList;
    // const validFcmTokens = fcmTokens
    //   .filter((fcm) => fcm.fcmToken && fcm.fcmToken !== 'undefined')
    //   .map((fcm) => fcm.fcmToken);

    // if (validFcmTokens.length > 0) {
    //   const fcmUrl = "https://fcm.googleapis.com/fcm/send";
    //   const fcmHeaders = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'key=AAAAaTWX5Gs:APA91bHzgQp6joaC4Kv2aTDyX-baS5DmmVvj4StsgV7FYIYLMhaCMXeCImEF6hUJDfEUbvTar9zVt2sw3xTbN70i6rL0IwtrrxJSLXo-aYA5NKuJyhU0EpUyD45mP_LktxYECLBxHw4X'
    //   };

    //   const notificationPayload = {
    //     registration_ids: validFcmTokens,
    //     notification: {
    //       title: notice.noticeTitle,
    //       body: "새로운 공지 사항을 확인하세요!"
    //     }
    //   };

    //   await axios.post(fcmUrl, notificationPayload, { headers: fcmHeaders })
    //     .then(response => console.log("Notification sent successfully:", response))
    //     .catch(error => console.error("Failed to send notification:", error));
    // } else {
    //   console.log("No valid FCM tokens available to send notifications.");
    // }

  } catch (error) {
    console.error("Error posting notification:", error);
    throw new Error("Error occurred while posting the notification.");
  }
}


async function getNotificationList(): Promise<Notices[]> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw new Error("Error occurred while getting the notifications.");
  }
}

async function getNotificationDetail(noticeId: number): Promise<Notice> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}/detail?noticeId=${noticeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting notification detail for ID: ${noticeId}`, error);
    throw new Error(`Error occurred while getting the notification with ID: ${noticeId}`);
  }
}

export { postNotification, getNotificationList, getNotificationDetail };
