'use client'
import { useWebAppData } from "@/shared/hooks/useWebAppData"
import { DtoResponse } from "@/shared/types/dto"
import { NftDbItem } from "@/shared/types/nft"
import { NftCard } from "@/widgets/nft-card/ui/NftCard"
import { FC, useEffect, useState } from "react"
type NftItemServerPageProps = {
    nftItemData: DtoResponse<NftDbItem>
}
export const NftItemPage:FC<NftItemServerPageProps> = ({nftItemData}) => {
    const { webApp } = useWebAppData();
    const [nftItem, setNftItem] = useState<NftDbItem>()
    useEffect(() => {
        webApp?.BackButton.show()
        setNftItem(nftItemData)
    }, [nftItemData])
    return (
        <section className="h-full">
            <div className="container">
                {nftItem && (<NftCard nftItem={nftItem}/>)}
            </div>
        </section>
    )
}