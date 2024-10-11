import { nftItemApi } from "@/widgets/nft-card/api/nftItemApi";
import { NftItemPage } from "./NftItemPage";

type TNftItemPageProps = {
    params: { uuid: string }
}

const NftItemServerPage = async ({ params }:TNftItemPageProps) => {
    const { uuid } = params;
    const nftItemData = await nftItemApi.getNftItem(uuid)
    if (nftItemData) return (
        <NftItemPage nftItemData={nftItemData}/>
    )
    return <><h1>not found</h1></>
}

export default NftItemServerPage;