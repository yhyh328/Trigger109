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
  noticeImg: string;
  noticeEmergency: number;
  noticeViewCnt: number;
  noticeCreatedAt: string;
};

export type Notices = [];

function b64toBlob(b64Data: string, contentType: string, sliceSize = 512): Blob {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

async function postNotification(notice: Notice): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }

  const token: string | null = localStorage.getItem('token');
  if (token) {
    local.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const noticePayload = {
      noticeTitle: notice.noticeTitle,
      noticeContent: notice.noticeContent,
      noticeImg: notice.noticeImg,
      noticeEmergency: notice.noticeEmergency,
      noticeViewCnt: notice.noticeViewCnt,
      noticeCreatedAt: notice.noticeCreatedAt,
    };

    console.log('Notice Payload:', noticePayload);

    await local.post(`${url}/register`, noticePayload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const fcmTokens = await getFCMs() as FCMList;
    const validFcmTokens = fcmTokens
      .filter((fcm) => fcm.fcmToken && fcm.fcmToken !== 'undefined')
      .map((fcm) => fcm.fcmToken);

    console.log('Valid FCM Tokens:', validFcmTokens);

    if (validFcmTokens.length > 0) {
      const fcmUrl = "https://fcm.googleapis.com/fcm/send";
      const fcmHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAaTWX5Gs:APA91bHzgQp6joaC4Kv2aTDyX-baS5DmmVvj4StsgV7FYIYLMhaCMXeCImEF6hUJDfEUbvTar9zVt2sw3xTbN70i6rL0IwtrrxJSLXo-aYA5NKuJyhU0EpUyD45mP_LktxYECLBxHw4X'
      };

      const notificationPayload = {
        registration_ids: validFcmTokens,
        notification: {
          title: notice.noticeTitle,
          body: "새로운 공지 사항을 확인하세요!"
        }
      };

      await axios.post(fcmUrl, notificationPayload, { headers: fcmHeaders })
        .then(response => console.log("Notification sent successfully:", response))
        .catch(error => console.error("Failed to send notification:", error));
    } else {
      console.log("No valid FCM tokens available to send notifications.");
    }

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
