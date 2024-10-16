// TelegramProvider
'use client'
import { TStartParams } from "@/shared/types/webApp";
import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TelegramContext = createContext<{
    webApp?: WebApp;
    initData?: string;
    initDataUnsafe?: WebAppInitData;
    startParams?: TStartParams;
}>({});

export const TelegramProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);

    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                initDataUnsafe: webApp.initDataUnsafe,
                initData: webApp.initData,
                user: webApp.initDataUnsafe.user,
            }
            : {};
    }, [webApp]);

    useEffect(() => {
        const WebApp:WebApp = (window as any).Telegram?.WebApp;
        if (WebApp) {
            WebApp.ready();
            WebApp.expand();
            setWebApp(WebApp);
        }
    }, []);

    return (
        <TelegramContext.Provider value={value}>
            {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);