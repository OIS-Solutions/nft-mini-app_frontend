import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";
import { DtoResponse } from "@/shared/types/dto";
import { NftDbItem, TNftItemUri } from "@/shared/types/nft";

const api = axios.create();
export const API_URL = process.env.API_URL || "https://toucan-delicate-broadly.ngrok-free.app"

export class NftListService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public getNftItem = async (uuid: string) => {
        try {
            const url = `${API_URL}/${apiRoutes.nft.serverRoute}/${uuid}`
            const response = await api.get<DtoResponse<NftDbItem>>(url);
            return response.data

        } catch (error: unknown) {
            this.handleError(error, 'Get NFTs');
            return undefined;
        }
    };


}

export const nftItemApi = new NftListService();