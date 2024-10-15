"use client"

import { useEffect, useMemo, useState } from "react"
import { parseStartParam } from "../lib/helpers/parseStartParam"
import { TStartParams } from "../types/webApp"

export const useWebAppData = () => {
    const [webAppData, setWebAppData] = useState<{
        webApp?: WebApp;
        initData?: string;
        initDataUnsafe?: WebAppInitData;
        startParams?: TStartParams;
    }>({});

    useEffect(() => {
        if (typeof window !== "undefined" && window?.Telegram?.WebApp) {
            const WebApp = window.Telegram.WebApp;
            const startParams = WebApp.initDataUnsafe?.start_param
                ? parseStartParam(WebApp.initDataUnsafe.start_param)
                : undefined;

            setWebAppData({
                webApp: WebApp,
                initData: WebApp.initData,
                initDataUnsafe: WebApp.initDataUnsafe,
                startParams,
            });
        }
    }, []);

    return useMemo(() => webAppData, [webAppData]);
}