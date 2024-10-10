import { NftList } from "@/widgets/hft-list/ui/NftList";
import { NftMinter } from "@/widgets/nft-minter/ui/NftMinter";

export default function Home() {
  return (
    <>
      <NftMinter />
      <NftList />
    </>
  );
}
