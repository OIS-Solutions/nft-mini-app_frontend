'use client'
import { DtoResponse } from "@/shared/types/dto"
import { NftDbItem } from "@/shared/types/nft"
import { NftCard } from "@/widgets/nft-card/ui/NftCard"
import { FC, useEffect, useState } from "react"
type NftItemServerPageProps = {
    nftItemData: DtoResponse<NftDbItem>
}
export const NftItemPage:FC<NftItemServerPageProps> = ({nftItemData}) => {
    const [nftItem, setNftItem] = useState<NftDbItem>()
    useEffect(() => {
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