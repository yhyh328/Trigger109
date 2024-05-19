import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";

const local: AxiosInstance | undefined = localAxios();  // Good fallback, consider root cause analysis
const url = "/api/v1/ranking";

export type RankingRow = {
    rankingId: string;
    member: string;
    memberNickname: string;
    memberImg?: string;  
    killCnt: number;
    death: number;
    createdAt: string;
    rating: number;
};

async function fetchRankingRows(): Promise<RankingRow[]> {
    if (!local) {
        throw new Error("Unable to fetch Axios instance.");  // Consider fallback or recovery strategy
    }
    try {
        const response = await local.get(`${url}`);
        // Validate data or use a schema validation library here
        return response.data.map((row: any) => ({
            ...row,
            isWin: row.isWin === 1  // Convert to boolean if stored as numeric
        }));
    } catch (error) {
        console.error("Error getting rankings:", error);
        throw new Error("Error occurred while getting the rankings.");  // Consider adding more detail or a user-friendly message
    }
}

export { fetchRankingRows }
