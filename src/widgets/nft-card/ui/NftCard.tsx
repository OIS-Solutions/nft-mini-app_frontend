'use client'
import { NftDbItem } from "@/shared/types/nft"
import { Button } from "antd"
import Image from "next/image"
import { FC } from "react"

type TNftCardProps = {
    nftItem: NftDbItem
}
export const NftCard: FC<TNftCardProps> = ({ nftItem }) => {
    const shareLink = `https://t.me/share/url?url=${"t.me/NFT_Creator_AppBot/app?startapp=nft_42a20d50-d6ba-4d5d-bfdd-2d9060818354"}&text=Check my new ${nftItem.uri.record.name}`
    return (
        <div>
            <div className="flex flex-col gap-4 mt-10">
                <div className="flex justify-center">
                    <Image 
                        src={nftItem.uri.record.image} 
                        alt="nft-image" 
                        width={300} 
                        height={300}
                        className="w-full aspect-square object-cover rounded-2xl"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-xl">{nftItem.uri.record.name} <span>{`#${nftItem.token_id}`}</span></h3>
                </div>
            </div>
            <div className="absolute bottom-[70px] left-0 right-0 flex justify-center">
                <Button type="primary" className="px-10">
                    <a className="btn_telegram_share" href={shareLink}>Поделиться</a>
                </Button>
            </div>
        </div>
    )
}