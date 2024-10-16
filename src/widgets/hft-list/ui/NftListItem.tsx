'use client'
import { classNames } from "@/shared/lib/helpers/classNames";
import { DtoResponse } from "@/shared/types/dto";
import { NftDbItem } from "@/shared/types/nft";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useMemo, memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const NftListItem: FC<DtoResponse<NftDbItem>> = memo((nft) => {
    //const [isLoaded, setIsLoaded] = useState(false);

    //const handleImageLoad = () => setIsLoaded(true);

    // Мемоизация ссылки для уменьшения ререндеров
    const nftLink = useMemo(() => `/nft/${nft.uuid}`, [nft.uuid]);
    return (
        <div key={nft.contract_address + nft.token_id} className="relative w-full aspect-square h-full">
            <Link href={nftLink}>
                {/* Изображение */}
                <Image
                    src={nft.uri.record.image}
                    alt={`nft-${nft.token_id}`}
                    width={100}
                    height={100}
                    loading="lazy"
                    className={classNames(
                        //isLoaded ? "opacity-100" : "opacity-0",
                        "rounded-xl object-cover w-full aspect-square",
                        "transition duration-500 ease-in-out",
                    )}
                    //onLoadingComplete={handleImageLoad}
                />
                {/* Токен */}
                <span className="font-bold absolute bottom-0 right-1">#{nft.token_id}</span>
            </Link>

            {/* Скелетон, если изображение не загружено */}
            {/* {!isLoaded &&
                <div className="absolute inset-0">
                    <SkeletonTheme baseColor="#888888" highlightColor="#d3d3d3" height={"100%"} borderRadius={12}>
                        <Skeleton />
                    </SkeletonTheme>
                </div>
            } */}
        </div>
    );
});

NftListItem.displayName = "NftListItem";
