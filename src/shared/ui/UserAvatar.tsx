import Image from "next/image"

export const UserAvatar = () => {
    return (
        <div>
            <Image
                className="rounded-full"
                src="https://api.telegram.org/file/bot7930519734:AAG18-GUUSRbLn0bJK9gC8YLx_W0PEsr8zI/photos/file_1.jpg" 
                alt="avatar"
                width={80}
                height={80}
            />
        </div>
    )
}
