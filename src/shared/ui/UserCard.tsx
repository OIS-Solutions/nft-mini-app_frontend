'use client'
import { UserAvatar } from "./UserAvatar"
import { useWebAppData } from "../hooks/useWebAppData"
import { useEffect, useState } from "react";
import { userCookie } from "../lib/helpers/cookies";
import { TCookieUserData } from "@/features/auth/types";

export const UserCard = () => {
    const {initDataUnsafe} = useWebAppData();
    const name = initDataUnsafe?.user?.first_name || initDataUnsafe?.user?.username
    const [avatar, setAvatar] = useState<string>()
    const cookieUserJson = userCookie.getValue()
    const cookieUser = cookieUserJson ? JSON.parse(cookieUserJson) as TCookieUserData : undefined

    useEffect(() => {
        console.log(888, cookieUser?.tgId, initDataUnsafe?.user?.id, cookieUser?.avatar);
        if (cookieUser?.tgId && cookieUser.tgId === initDataUnsafe?.user?.id && cookieUser.avatar) {
            setAvatar(cookieUser.avatar)
        }
    }, [initDataUnsafe?.user?.id, cookieUser])

    return (
        <div className="flex flex-col items-center gap-1">
            <UserAvatar avatar={avatar}/>
            {name && <span className="font-bold">{name}</span>}
        </div>
    )
}