import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";
import { DtoResponse } from "@/shared/types/dto";
import { NftDbItem, TNftItemUri } from "@/shared/types/nft";

const api = axios.create();
api.defaults.headers["common"]["ngrok-skip-browser-warning"] = "any_value"


export class NftListService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public getUserNftList = async (tg_id: number) => {
        try {
            const response = await api.get<DtoResponse<NftDbItem>[]>(apiRoutes.nft.baseRoute, { params: { tg_id } });
            if (response.data.length !== 0) {
                return response.data;
            }
            return []

        } catch (error: unknown) {
            this.handleError(error, 'Get NFTs');
            return [];
        }
    };


}

export const nftListApi = new NftListService();