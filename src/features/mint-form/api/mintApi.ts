import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";

const api = axios.create();

type TMintResponse = {
    data: any
}

type TMintData = {
    initData: string,
    uriUrl: string,
}

export class NftService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public mintNft = async (mintData: TMintData) => {
        try {
            const response = await api.post<TMintResponse>(apiRoutes.nft.baseRoute, mintData)
            const nft = response.data
            return nft
        } catch (error: unknown) {
            this.handleError(error, 'Mint NFT');
            return null;
        }
    }


}

export const nftApi = new NftService();