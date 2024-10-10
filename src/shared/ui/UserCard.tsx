'use client'
import { useEffect, useState } from "react"
import { UserAvatar } from "./UserAvatar"

export const UserCard = () => {
    const [username, setUsername] = useState<string>()
    const WebApp = typeof window !== "undefined" && window?.Telegram?.WebApp
    useEffect(() => {
        if (WebApp) {
            setUsername(WebApp.initDataUnsafe.user?.first_name)
        }
    }, [])
    return (
        <div className="flex flex-col items-center gap-1">
            <UserAvatar />
            <span className="font-bold">{username}</span>
        </div>
    )
}