"use client"

import { useEffect, useState } from "react"
import { parseStartParam } from "../lib/helpers/parseStartParam"
import { TStartParams } from "../types/webApp"

export const useWebAppData = () => {
    //const [webApp, setWebAppData] = useState<WebApp>()
    const [initData, setInitData] = useState<string>()
    const [initDataUnsafe, setInitDataUnsafe] = useState<WebAppInitData>()
    const [startParams, setStartParams] = useState<TStartParams>()

    useEffect(() => {
        if (typeof window !== "undefined" && window?.Telegram?.WebApp) {
            const WebApp = window.Telegram.WebApp
            setInitData(WebApp.initData)
            setInitDataUnsafe(WebApp.initDataUnsafe)
            WebApp.initDataUnsafe.start_param && setStartParams(parseStartParam(WebApp.initDataUnsafe.start_param))
        }
    }, [])
    return {
        initData,
        initDataUnsafe,
        startParams,
    }
}