import { AxiosInstance } from "axios";
import { localAxios } from "../util/http-commons";
import * as Yup from "yup";

// Establish the Axios instance
const local: AxiosInstance | undefined = localAxios();
const url = "/api/v1/ranking";

// Define the interfaces for the API data
interface Member {
    memberId: number;
    email: string;
    nickName: string;
    role: string;
    level?: number;
    createdAt: string;
    profileImg?: string;  // Optional as per the data structure
}

interface RankingRow {
    rankingId: number;
    isWin: string;
    killCnt: number;
    death?: number;
    createdAt: string;
    rating?: number;
    member: Member;
}


// Define the validation schema using Yup
const rankingRowSchema = Yup.object().shape({
    isWin: Yup.number().required(),
    rating: Yup.number().required(),
    member: Yup.object().shape({
        memberId: Yup.number().required(),
        email: Yup.string().required().email(),
        nickName: Yup.string().required(),
        role: Yup.string().required(),
        level: Yup.number().nullable().notRequired(),
        createdAt: Yup.string().required(),
        profileImg: Yup.string().url().nullable().notRequired(),
    }).required(),
});

// Async function to fetch and validate ranking data
async function fetchRankingRows(): Promise<RankingRow[]> {
    if (!local) {
        throw new Error("Unable to fetch Axios instance.");
    }
    try {
        const response = await local.get(url);
        console.log('response.data: ', response.data)
        return response.data
    } catch (error: unknown) {
        console.error("Error getting rankings:", error);
        if (error instanceof Error) {
            throw new Error("Error occurred while getting the rankings. " + error.message);
        } else {
            throw new Error("Error occurred while getting the rankings. An unknown error occurred");
        }
    }
}

// Export types and functions
export type { Member, RankingRow };
export { fetchRankingRows };
