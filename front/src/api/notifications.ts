import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";
import axios from "axios";
import { generateToken } from "../component/notifications/firebase";

const local: AxiosInstance | undefined = localAxios();
const url = "api/v1/notice";

export type Notice = {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeImg?: string | null | undefined;
  noticeEmergency: number;
  noticeViewCnt: number;
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

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

async function postNotification(notice: Notice): Promise<void> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  const formData = new FormData();
  formData.append('noticeTitle', notice.noticeTitle);
  formData.append('noticeContent', notice.noticeContent);
  formData.append('noticeEmergency', notice.noticeEmergency.toString());
  formData.append('noticeViewCnt', notice.noticeViewCnt.toString());

  if (notice.noticeImg) {
    // Assuming noticeImg is a base64 string of the image, we need to convert it to a File/Blob object
    const blob = b64toBlob(notice.noticeImg.split(',')[1], notice.noticeImg.split(',')[0].split(':')[1].split(';')[0]);
    formData.append('noticeImg', new File([blob], "filename.png"));
    // formData.append('noticeImg', notice.noticeImg)
  }

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxNTQzMjgxOCwiZW1haWwiOiJleGFtcGxlMUBleGFtcGxlLmNvbSJ9.wOYtp2_h3-qAQM1tAMSnsuHRsbJFfXE6FfQ9OdyOPpdxGC1U-UMlaQUa1l9q8XX3Pj7TtcOR5n7TTLV6pGm5WQ";
  local.defaults.headers.Authorization = "Bearer " + token;
    
  try {
    await local.post(`${url}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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

async function getNotificationDetail(noticeId: string): Promise<Notice> {
  if (!local) {
    throw new Error("Unable to create Axios instance.");
  }
  try {
    const response = await local.get(`${url}/${noticeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting notification detail for ID: ${noticeId}`, error);
    throw new Error(`Error occurred while getting the notification with ID: ${noticeId}`);
  }
}

export { postNotification, getNotificationList, getNotificationDetail };
