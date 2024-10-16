// TelegramProvider
'use client'
import { TStartParams } from "@/shared/types/webApp";
import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initDataMock } from "./WebAppProvider";
import { authApi } from "@/features/auth/api/authApi";
import { HttpStatusCode } from "axios";
import { tokenCookie, userCookie } from "@/shared/lib/helpers/cookies";
import { parseStartParam } from "@/shared/lib/helpers/parseStartParam";
import { useRouter } from "next/navigation";

export const TelegramContext = createContext<{
    webApp?: WebApp;
    initData?: string;
    initDataUnsafe?: WebAppInitData;
    startParams?: TStartParams;
    backButton?: BackButton;
    user?: WebAppUser;
}>({});

export const TelegramProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);
    const [ready, setReady] = useState(false);
    const router = useRouter();
    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                initDataUnsafe: webApp.initDataUnsafe,
                initData: webApp.initData,
                user: webApp.initDataUnsafe.user,
                backButton: webApp.BackButton,
            }
            : {};
    }, [webApp]);

    const authCheck = async () => {
        const WebApp:WebApp = (window as any).Telegram?.WebApp;
        if (WebApp.initData || initDataMock) {
            console.log("WebAppProvider initData: ", WebApp.initData);
            console.log("window.Telegram.WebApp.isExpanded", window.Telegram.WebApp.isExpanded);
            try {
                const response = await authApi.login(WebApp.initData || initDataMock);
                if (response?.data) {
                    if (response?.status === HttpStatusCode.Ok) {
                        console.log("user is updated");
                    } else if (response?.status === HttpStatusCode.Created) {
                        console.log("user is Created");
                    }
                    tokenCookie.setValue(response?.data.token);
                    userCookie.setValue(JSON.stringify({ avatar: response?.data.user.avatar, tgId: response?.data.user.tgId }));
                }
            } catch (error) {
                console.error("Auth failed", error);
            }
        }
    }

    useEffect(() => {
        const WebApp:WebApp = (window as any).Telegram?.WebApp;
        if (WebApp) {
            setReady(true)
            WebApp.ready();
            WebApp.expand();
            setWebApp(WebApp);

            if (WebApp.initDataUnsafe?.start_param) {
                const startParams = parseStartParam(WebApp.initDataUnsafe.start_param)
                startParams.nft && router.push(`/nft/${startParams.nft}`)
            }
        }
        authCheck()
    }, []);

    return (
        <TelegramContext.Provider value={value}>
            {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            {ready ? children : <div className="fixed inset-0 bg-background flex justify-center items-center">LOADING</div>}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);