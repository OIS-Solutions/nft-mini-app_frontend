import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";

const api = axios.create();
api.defaults.headers["common"]["ngrok-skip-browser-warning"] = "any_value"

type TAuthResponse = {
    token: string
}

export class AuthService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public login = async (initData: string) => {
        try {
            const response = await api.post<TAuthResponse>(apiRoutes.auth, {initData})
            const nft = response
            return nft
        } catch (error: unknown) {
            this.handleError(error, 'login');
            return null;
        }
    }


}

export const authApi = new AuthService();