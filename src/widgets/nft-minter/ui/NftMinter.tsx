"use client"
import { useAppStore } from "@/app/_providers/StoreProvider"
import { initDataMock } from "@/app/_providers/WebAppProvider"
import { nftApi } from "@/features/mint-form/api/mintApi"
import { setNftUri } from "@/features/mint-form/helpers/setNftUri"
import { TFormData } from "@/features/mint-form/types"
import { NFTForm } from "@/features/mint-form/ui/MintForm"
import { toastMessage } from "@/shared/lib/helpers/toastify"
import { CustomButton } from "@/shared/ui/CustomButton"
import { ModalMobile } from "@/shared/ui/ModalMobile"
import { useState } from "react"

export const NftMinter = () => {
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const {addNftItem} = useAppStore(state => state)
    const initData = typeof window !== "undefined" && window?.Telegram?.WebApp.initData ? window?.Telegram?.WebApp.initData : initDataMock
    const handleSubmitForm = async (values: TFormData) => {
        //handleCloseModal()
        setPending(true);
        try {
            /* 1. Get Image URL */
            const formData = new FormData();
            formData.append('file', values.imageFile);
            const uploadedImageUrl = await nftApi.uploadImagePinata(values.imageFile)
            if (!uploadedImageUrl) throw new Error("Image upload error");
            toastMessage.success("Image uploaded");
            /* 2. Get URI URL */
            const nftDataDto = {
                name: values.name,
                image: uploadedImageUrl,
            };
            const uri = await nftApi.uploadUri(setNftUri(nftDataDto))
            if (!uri) throw new Error("Uri upload error");
            toastMessage.success("uri uploaded");
            /* 3. Get NFT */
            if (initData) {
                const nftData = await nftApi.mintNft({initData, uriUrl: uri})
                if (nftData) {
                    addNftItem(nftData)
                    setSuccess(true);
                    handleCloseModal()
                    toastMessage.success(`Congratulations! You've created an NFT!`)
                } else {
                    setSuccess(false);
                }
            }
            setIsFinished(true)
        } catch (error) {
            console.error(error);
            setSuccess(false);
        }
        setPending(false);
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <section className="flex flex-col items-center">
            <div className="container">
                <div className="flex flex-col gap-10">
                    <h2 className="gradient-text text-center font-bold text-2xl">Create your unique NFT now!</h2>
                    <CustomButton color="purple" extraClass="text-white" onClick={handleOpenModal}>Boop NFT</CustomButton>
                </div>
            </div>
            <ModalMobile title="Mint NFT" isOpen={openModal} onClose={handleCloseModal}>
                <NFTForm onSubmit={handleSubmitForm} loading={pending} isFinished={isFinished}/>
            </ModalMobile>
        </section>
    )
}