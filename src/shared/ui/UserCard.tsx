'use client'
import { UserAvatar } from "./UserAvatar"
import { useWebAppData } from "../hooks/useWebAppData"

export const UserCard = () => {
    const {initDataUnsafe} = useWebAppData();
    const name = initDataUnsafe?.user?.first_name || initDataUnsafe?.user?.username
    return (
        <div className="flex flex-col items-center gap-1">
            <UserAvatar />
            {name && <span className="font-bold">{name}</span>}
        </div>
    )
}