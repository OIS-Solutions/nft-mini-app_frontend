import { TNftItemUri } from "@/shared/types/nft"
import { Button } from "antd"
import { FC } from "react"

type TNftCardProps = {
    data: TNftItemUri & { tokenId: number }
}
export const NftCard: FC<TNftCardProps> = ({ data }) => {
    return (
        <div>
            <div className="flex flex-col gap-4 mt-10">
                <div>
                    <img src={data.image} alt="nft-image" />
                </div>
                <div>
                    <h3 className="font-bold text-xl">{data.name} <span>{`#${data.tokenId}`}</span></h3>
                </div>
            </div>
            <div className="absolute bottom-[70px] left-0 right-0 flex justify-center">
                <Button type="primary" className="px-10">
                    <a className="btn_telegram_share" href={`https://t.me/share/url?url=${"t.me/SmartFactoryTMA_Bot/app"}&text=Share NFT`}>Поделиться</a>
                </Button>
            </div>
        </div>
    )
}