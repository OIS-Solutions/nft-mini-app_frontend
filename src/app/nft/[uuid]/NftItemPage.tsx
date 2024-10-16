'use client'
import { useTelegram } from "@/app/_providers/TelegramProvider"
import { DtoResponse } from "@/shared/types/dto"
import { NftDbItem } from "@/shared/types/nft"
import { NftCard } from "@/widgets/nft-card/ui/NftCard"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

type NftItemServerPageProps = {
    nftItemData: DtoResponse<NftDbItem>
}

export const NftItemPage: FC<NftItemServerPageProps> = ({ nftItemData }) => {
    const { backButton } = useTelegram();
    const [nftItem, setNftItem] = useState<NftDbItem>();
    const router = useRouter();

    useEffect(() => {
        setNftItem(nftItemData)
        backButton?.show()
        const routeToHome = () => {
            router.push("/")
        }
        backButton?.onClick(routeToHome)
        return () => {
            backButton?.hide()
            backButton?.offClick(routeToHome)
        }
    }, [])

    return (
        <section className="h-full">
            <div className="container">
                {nftItem && <NftCard nftItem={nftItem} />}
            </div>
        </section>
    )
}