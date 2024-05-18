import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance | undefined = localAxios();
const url = "/api/v1/ranking";

export type RankingRow = {
    rankingId: number;
    member: number;
    isWin: number;
    killCnt: number;
    death: number;
    createdAt: string;
    rating: number;
}

async function fetchRankingRows(): Promise<RankingRow[]> {
    if (!local) {
        throw new Error("Unable to fetch Axios instance.");
    }
    try {
        const response = await local.get(`${url}`);
        return response.data; 
    } catch (error) {
        console.error("Error getting rankings:", error);
        throw new Error("Error occurred while getting the rankings.");
    }
}

export { fetchRankingRows }
