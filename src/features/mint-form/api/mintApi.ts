import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";
import { DtoResponse } from "@/shared/types/dto";
import { NftDbItem, TNftItemUri } from "@/shared/types/nft";
import { PinataSDK } from "pinata-web3";

const api = axios.create();
api.defaults.headers["common"]["ngrok-skip-browser-warning"] = "any_value"


type TMintData = {
    initData: string,
    uriUrl: string,
}

export const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT!
export const pinataGateway = "tan-impressed-finch-241.mypinata.cloud"
const pinata = new PinataSDK({ pinataJwt, pinataGateway });

export class NftService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public uploadImagePinata = async (image: File) => {

        try {
            const response = await pinata.upload.file(image)
            const imageHash = response.IpfsHash
            return `https://${pinataGateway}/ipfs/${imageHash}`
        } catch (error: unknown) {
            this.handleError(error, 'Image upload');
            return null;
        }
    }

    public uploadUri = async (uriData: TNftItemUri) => {
        try {
            const response = await pinata.upload.json(uriData)
            const uriHash = response.IpfsHash
            return `https://${pinataGateway}/ipfs/${uriHash}`
        } catch (error: unknown) {
            this.handleError(error, 'Uri upload');
            return null;
        }
    }

    public mintNft = async (mintData: TMintData) => {
        try {
            const response = await api.post<DtoResponse<NftDbItem>>(apiRoutes.nft.baseRoute, mintData)
            const nft = response.data
            return nft
        } catch (error: unknown) {
            this.handleError(error, 'Mint NFT');
            return null;
        }
    }


}

export const nftApi = new NftService();