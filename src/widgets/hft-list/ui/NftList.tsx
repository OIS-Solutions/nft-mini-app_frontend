"use client"

import { useEffect, useState } from "react"
import { nftListApi } from "../api/nftListApi"
import { NftDbItem } from "@/shared/types/nft"
import Image from "next/image"
import Link from "next/link"

export const NftList = () => {
    const [nftList, setNftList] = useState<NftDbItem[]>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (typeof window !== "undefined" && window.Telegram.WebApp) {
            const WebApp = window.Telegram.WebApp;
            //todo убрать tg_id 439572632
            const tg_id = WebApp.initDataUnsafe.user?.id || 439572632
            if (tg_id) {
                console.log("WebApp tg_id: ", WebApp.initDataUnsafe.user?.id);
                
                setLoading(true)
                nftListApi
                    .getUserNftList(tg_id)
                    .then((data) => {
                        setNftList(data)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }

    }, [])
    return (
        <div className="my-10">
            <div className="container">
                <div className="grid grid-cols-3 place-items-center">
                    {nftList && nftList.map((nft) => (
                        <div key={nft.contract_address+nft.token_id}>
                            <Link href={`/nft/${nft.uuid}`}>
                                <Image
                                    src={nft.uri.record.image}
                                    alt="nft-image"
                                    width={100}
                                    height={100}
                                    className="rounded-xl object-cover w-[100px] h-[100px]"
                                />
                                <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}