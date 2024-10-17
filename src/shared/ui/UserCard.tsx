'use client'
import { UserAvatar } from "./UserAvatar"
//import { useWebAppData } from "../hooks/useWebAppData"
import { useEffect, useState } from "react";
import { userCookie } from "../lib/helpers/cookies";
import { TCookieUserData } from "@/features/auth/types";
import { useTelegram } from "@/app/_providers/TelegramProvider";
import { useAppStore } from "@/app/_providers/StoreProvider";

export const UserCard = () => {
    //const {initDataUnsafe} = useWebAppData();
    const {initDataUnsafe} = useTelegram();
    const name = initDataUnsafe?.user?.first_name || initDataUnsafe?.user?.username
    const { user, setUser } = useAppStore(state => state)
    const cookieUserJson = userCookie.getValue()

    useEffect(() => {
        const cookieUser = cookieUserJson ? JSON.parse(cookieUserJson) as TCookieUserData : undefined
        if (cookieUser) {
            setUser(cookieUser)
        }
    }, [initDataUnsafe?.user?.id, cookieUserJson])

    return (
        <div className="flex flex-col items-center gap-1">
            <UserAvatar avatar={user.avatar}/>
            {name && <span className="font-bold">{name}</span>}
        </div>
    )
}