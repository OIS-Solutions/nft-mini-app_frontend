'use client'
import { shortenedAddress } from "@/shared/lib/helpers/shortenAddress"
import { NftDbItem } from "@/shared/types/nft"
import { CustomButton } from "@/shared/ui/CustomButton"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

type TNftCardProps = {
    nftItem: NftDbItem
}
export const NftCard: FC<TNftCardProps> = ({ nftItem }) => {
    const shareLink = `https://t.me/share/url?url=${"t.me/NFT_Creator_AppBot/app?startapp=nft_42a20d50-d6ba-4d5d-bfdd-2d9060818354"}&text=Check my new ${nftItem.uri.record.name}`
    const infoList = [
        { title: 'Name', value: nftItem.uri.record.name || "-" },
        { title: 'Contract address', value: nftItem.contract_address },
        { title: 'Token ID', value: nftItem.token_id },
        { title: 'Token Standard', value: 'ERC-721' },
        { title: 'Chain', value: 'polygon' },
    ]
    return (
        <div>
            <div className="flex flex-col gap-4 mt-10">
                <div className="flex justify-center">
                    <Image
                        src={nftItem.uri.record.image || 'https://i.imghippo.com/files/wRmqb1728671407.jpg'} //todo remove!
                        alt="nft-image"
                        width={300}
                        height={300}
                        className="w-full aspect-square object-cover rounded-2xl"
                    />
                </div>
                <div>
                    {infoList.map((item, index) => (
                        <div className="flex justify-between" key={index}>
                            <h2 className="font-bold">{item.title}</h2>
                            <span>{item?.value?.toString().startsWith("0x")
                                ? <Link className="text-blue-400" target="_blank" href={`https://polygonscan.com/address/${item.value}`}>{shortenedAddress(item.value.toString())}</Link>
                                : item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <CustomButton color="purple" extraClass="px-10">
                    <a className="btn_telegram_share" href={shareLink}>Share NFT</a>
                </CustomButton>
            </div>
        </div>
    )
}