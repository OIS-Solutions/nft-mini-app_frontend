
import { classNames } from "@/shared/lib/helpers/classNames"
import { FC, MouseEventHandler, ReactNode } from "react"
import CloseIcon from "@/shared/assets/icons/close-x.svg"
type TModalMobileProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    title: string,
}

export const ModalMobile: FC<TModalMobileProps> = ({ isOpen, onClose, title, children }) => {

    const handleCloseModal = () => {
        onClose()
    }
    const handleClickModal: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            className={classNames(
                isOpen ? "visible bg-black/30" : "invisible bg-black/0",
                "z-10 fixed inset-0",
                "transition-all duration-300 ease-in"
            )}
            onClick={handleCloseModal}
        >
            <div
                className={classNames(
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "fixed bottom-[-1px] left-[-1px] right-[-1px] z-10",
                    "bg-background",
                    "rounded-t-3xl py-4 px-5",
                    "transition-translate duration-300 ease-in-out",
                    "border border-gray-300 dark:border-gray-600"
                )}
                onClick={handleClickModal}
            >
                <h2 className="text-center mb-2">{title}</h2>
                {children}
                <button onClick={handleCloseModal} className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <CloseIcon fill="#696969" className="text-yellow"/>
                </button>
            </div>
        </div>
    )
}