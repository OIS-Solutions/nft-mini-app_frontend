"use client"
import { nftApi } from "@/features/mint-form/api/backendApi"
import { uriApi } from "@/features/mint-form/api/uriApi"
import { setNftUri } from "@/features/mint-form/helpers/setNftUri"
import { TNftFormValues } from "@/features/mint-form/types"
import { MintForm } from "@/features/mint-form/ui/MintForm"
import { CustomButton } from "@/shared/ui/CustomButton"
import { ModalMobile } from "@/shared/ui/ModalMobile"
import { message } from "antd"
import { useEffect, useState } from "react"

export const NftMinter = () => {
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const handleSubmitForm = async (values: TNftFormValues) => {
        console.log(111, values);
        
        setPending(true);
        try {
            const uri = await uriApi.uploadUri(setNftUri({ ...values, image: values.image[0] }))
            if (uri) {
                const nftData = await nftApi.mintNft({tgUser: "maxsvk", uriUrl: uri})
                if (nftData) {
                    setSuccess(true);
                    handleCloseModal()
                    message.success("success")
                } else {
                    setSuccess(false);
                }
            }
        } catch (error) {
            setSuccess(false);
        }
        setPending(false);


        //setAmountValue(BigInt(1))
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    useEffect(() => {
        console.log(222, window.Telegram.WebApp.initData);
    }, [])
    return (
        <section className="flex flex-col items-center pt-[25%]">
            <div className="container">
                <div className="flex flex-col gap-10">
                    <h2 className="gradient-text text-center font-bold text-2xl">Create your unique NFT now!</h2>
                    <CustomButton color="purple" onClick={handleOpenModal}>Create</CustomButton>
                </div>
            </div>
            <ModalMobile title="Mint NFT" isOpen={openModal} onClose={handleCloseModal}>
                <MintForm onSubmit={handleSubmitForm} loading={pending} isSuccess={isSuccess}/>
            </ModalMobile>
        </section>
    )
}