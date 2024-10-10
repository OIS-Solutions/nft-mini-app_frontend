"use client"

import { useEffect, useState } from "react"
import { nftListApi } from "../api/nftListApi"
import { NftDbItem } from "@/shared/types/nft"
import Image from "next/image"

export const NftList = () => {
    const [nftList, setNftList] = useState<NftDbItem[]>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        nftListApi
            .getUserNftList(439572632)
            .then((data) => {
                setNftList(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return (
        <div className="my-10">
            <div className="container">
            <div className="grid grid-cols-3 place-items-center">
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
                {nftList && nftList.map((nft) => (
                    <div key={nft.contract_address}>
                        <Image
                            src={nft.uri.record.image}
                            alt="nft-image"
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                        <h3 className="capitalize font-bold">{nft.uri.record.name} #<span>{nft.token_id}</span></h3>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}