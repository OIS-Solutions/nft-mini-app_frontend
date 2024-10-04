import { NftCard } from "@/widgets/nft-card/ui/NftCard"

type TNftItemPageProps = {
    params: { item: string }
}

const item = {
    image: "https://dornn71e22fzi.cloudfront.net/nft/img/tron/0x2b6653dc/5915088084828167375.webp",
    name: "Blind Monkey",
    description: "",
    tokenId: 12,
}

const NftItemPage = ({ params }:TNftItemPageProps) => {

    return (
        <section className="h-full">
            <div className="container">
                <NftCard data={item}/>
            </div>
        </section>
    )
}

export default NftItemPage;