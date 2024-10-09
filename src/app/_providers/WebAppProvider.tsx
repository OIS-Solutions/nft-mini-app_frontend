'use client'

import { authApi } from "@/features/auth/api/authApi";
import { tokenCookie } from "@/shared/lib/helpers/cookies";
import { HttpStatusCode } from "axios";
import { ReactNode, useEffect } from "react";
export const initData = "query_id=AAGYWDMaAAAAAJhYMxo_yYQL&user=%7B%22id%22%3A439572632%2C%22first_name%22%3A%22Maxim%22%2C%22last_name%22%3A%22Mhlko%22%2C%22username%22%3A%22maxsvk%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728443094&hash=383fe07bbd53f5eb4ba007a0cea9897de39ad79cbc366d9c2ec3f60e54e078f4"

export const WebAppProvider = ({ children }: { children:ReactNode }) => {
    //const WebApp = window?.Telegram?.WebApp
    useEffect(() => {
        if (initData) {
            authApi
                .login(initData)
                .then(response => {
                    if (response?.data) {
                        if (response?.status === HttpStatusCode.Ok) {
                            console.log("user is updated");
                        } else if (response?.status === HttpStatusCode.Created) {
                            console.log("user is Created");
                        }
                        tokenCookie.setValue(response?.data.token);
                    }

                })
        }
    }, [])
    return (
        <>{children}</>
    )
}