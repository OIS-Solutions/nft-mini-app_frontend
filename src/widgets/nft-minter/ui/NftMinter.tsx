"use client"
import { initDataMock } from "@/app/_providers/WebAppProvider"
import { imageApi } from "@/features/mint-form/api/imageApi"
import { nftApi } from "@/features/mint-form/api/mintApi"
import { uriApi } from "@/features/mint-form/api/uriApi"
import { setNftUri } from "@/features/mint-form/helpers/setNftUri"
import { TFormData } from "@/features/mint-form/types"
import { NFTForm } from "@/features/mint-form/ui/MontFormNew"
import { CustomButton } from "@/shared/ui/CustomButton"
import { ModalMobile } from "@/shared/ui/ModalMobile"
import { message } from "antd"
import { useState } from "react"

export const NftMinter = () => {
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const initData = typeof window !== "undefined" && window?.Telegram?.WebApp.initData ? window?.Telegram?.WebApp.initData : initDataMock
    const handleSubmitForm = async (values: TFormData) => {
        handleCloseModal()
        setPending(true);
        try {
            const formData = new FormData();
            formData.append('file', values.imageFile);
            const imageUploadResponse = await imageApi.uploadImage(formData);
            if (!imageUploadResponse) throw new Error("Image upload error");
            const uploadedImageUrl = imageUploadResponse?.data.view_url;
            const nftDataDto = {
                name: values.name,
                image: uploadedImageUrl,
            };
            const uri = await uriApi.uploadUri(setNftUri(nftDataDto))
            if (uri && initData) {
                const nftData = await nftApi.mintNft({initData, uriUrl: uri})
                if (nftData) {
                    setSuccess(true);
                    handleCloseModal()
                    message.success("success")
                } else {
                    setSuccess(false);
                }
            }
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
                <NFTForm onSubmit={handleSubmitForm} />
            </ModalMobile>
        </section>
    )
}