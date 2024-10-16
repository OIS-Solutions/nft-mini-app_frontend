'use client'
import { useTelegram } from "@/app/_providers/TelegramProvider"
//import { useWebAppData } from "@/shared/hooks/useWebAppData"
import { DtoResponse } from "@/shared/types/dto"
import { NftDbItem } from "@/shared/types/nft"
import { CustomButton } from "@/shared/ui/CustomButton"
import { NftCard } from "@/widgets/nft-card/ui/NftCard"
import { FC, useEffect, useState } from "react"
type NftItemServerPageProps = {
    nftItemData: DtoResponse<NftDbItem>
}
export const NftItemPage:FC<NftItemServerPageProps> = ({nftItemData}) => {
    //const { webApp } = useWebAppData();
    const {webApp} = useTelegram();
    const [nftItem, setNftItem] = useState<NftDbItem>()
    useEffect(() => {
        webApp?.BackButton.show()
        console.log(777, webApp,  webApp?.BackButton.show);
        setNftItem(nftItemData)
    }, [nftItemData, webApp])
    return (
        <section className="h-full">
            <div className="container">
                {nftItem && (<NftCard nftItem={nftItem}/>)}
                <CustomButton color="purple" onClick={() => {
                    console.log("BackButton clicked");
                    
                    webApp?.BackButton.show()
                }}>BackButton</CustomButton>
            </div>
        </section>
    )
}