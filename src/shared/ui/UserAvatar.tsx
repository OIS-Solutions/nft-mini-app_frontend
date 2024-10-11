"use client"
import Image from "next/image"
import { avatarCookie } from "../lib/helpers/cookies"
import { useWebAppData } from "../hooks/useWebAppData"
import { classNames } from "../lib/helpers/classNames"
import { useEffect, useState } from "react"

export const UserAvatar = () => {
    const { initDataUnsafe } = useWebAppData()
    const [avatar, setAvatar] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const ImageAvatar = () => (
        <div className="w">
            <Image
                className={`rounded-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                src={avatar}
                alt="avatar"
                width={80}
                height={80}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    )
    const getAvatarImage = () => {
        switch (true) {
            case Boolean(avatar):
                return avatar && <ImageAvatar />
            case Boolean(initDataUnsafe?.user?.first_name):
                return initDataUnsafe?.user?.first_name && <AvatarText initials={initDataUnsafe?.user?.first_name[0]} />
            case Boolean(initDataUnsafe?.user?.username):
                return initDataUnsafe?.user?.username && <AvatarText initials={initDataUnsafe?.user?.username[0]} />
            default:
                return <AvatarText initials={""} />
        }
    }
    const AvatarText = ({ initials }: { initials: string }) => (
        <span>
            {initials}
        </span>
    )
    useEffect(() => {
        const value = avatarCookie.getValue()
        value && setAvatar(value)
    }, [])
    return (
        <div className={classNames(
            "w-[80px] h-[80px] rounded-full",
            "bg-blue-500",
            "flex justify-center items-center",

        )}>
            {getAvatarImage()}
        </div>
    )
}
