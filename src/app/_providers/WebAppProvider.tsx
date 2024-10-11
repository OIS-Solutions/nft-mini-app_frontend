'use client'

import { authApi } from "@/features/auth/api/authApi";
import { useWebAppData } from "@/shared/hooks/useWebAppData";
import { avatarCookie, tokenCookie } from "@/shared/lib/helpers/cookies";
import { HttpStatusCode } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
export const initDataMock = "query_id=AAGYWDMaAAAAAJhYMxo_yYQL&user=%7B%22id%22%3A439572632%2C%22first_name%22%3A%22Maxim%22%2C%22last_name%22%3A%22Mhlko%22%2C%22username%22%3A%22maxsvk%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728443094&hash=3123qwedesadxsa"

export const WebAppProvider = ({ children }: { children:ReactNode }) => {
    //const WebApp = typeof window !== "undefined" && window?.Telegram?.WebApp
    const { webApp, initData, startParams } = useWebAppData();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        //const initData = WebApp && WebApp?.initData || initDataMock
        if (initData || initDataMock) {
            authApi
                .login(initData || initDataMock)
                .then(response => {
                    if (response?.data) {
                        if (response?.status === HttpStatusCode.Ok) {
                            console.log("user is updated");
                        } else if (response?.status === HttpStatusCode.Created) {
                            console.log("user is Created");
                        }
                        tokenCookie.setValue(response?.data.token);
                        avatarCookie.setValue(response?.data.user.avatar);
                    }

                })
        }
        if (startParams) {
            startParams.nft && router.push(`/nft/${startParams.nft}`)
        }
    }, [initData])
    useEffect(() => {
        if (pathname === "/") {
            webApp?.BackButton.hide()
        }
    }, [pathname])
    return (
        <>{children}</>
    )
}