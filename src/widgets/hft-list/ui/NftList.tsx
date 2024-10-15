"use client"

import { useEffect, useState } from "react"
import { nftListApi } from "../api/nftListApi"
import { NftDbItem } from "@/shared/types/nft"
import { useAppStore } from "@/app/_providers/StoreProvider"
import { DtoResponse } from "@/shared/types/dto"
import { NftListItem } from "./NftListItem"

export const NftList = () => {
    //const [nftList, setNftList] = useState<NftDbItem[]>();
    const [loading, setLoading] = useState(false);
    const { setUserNftList, userNftList } = useAppStore(state => state)

    const renderNftList = (nft: DtoResponse<NftDbItem>) => <NftListItem {...nft}/>
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
                        //setNftList(data)
                        setUserNftList(data)
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
                <div className="grid grid-cols-3 place-items-center gap-3">
                    {userNftList && userNftList.map(renderNftList)}
                </div>
            </div>
        </div>
    )
}