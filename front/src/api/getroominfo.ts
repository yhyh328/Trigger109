import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

interface RoomInfo {
  roomId: string;
  roomTitle: string;
  memberId: string;
  // additional fields can be added here as needed
}

const getRoomInfoUrl = "https://trigger109.com/api/v1/live/roomAllInfo";

// Function to fetch room information
export const getRoomInfo = async (): Promise<RoomInfo[]> => {
  const local: AxiosInstance = localAxios();
  const token = localStorage.getItem('token');
  
  try {
      const response = await local.get(getRoomInfoUrl, {
          headers: {
              'Authorization': `Bearer ${token}` // Include the authentication token in the request header
          },
      });

      // If fetch is successful, return the room information from the server
      const rooms: RoomInfo[] = response.data;
      console.log('Rooms fetched successfully:', rooms);
      return rooms;
  } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error; // Allows error handling in the calling component
  }
};
