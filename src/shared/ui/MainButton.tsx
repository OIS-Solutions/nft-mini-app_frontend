import { FC, ReactNode } from "react"
import { CustomButton } from "./CustomButton"
type TMainButtonProps = {
    children: ReactNode,
    onClick?: () => void,
}
export const MainButton:FC<TMainButtonProps> = ({children, onClick}) => {
    return (
        <CustomButton styleType="main" color="purple" htmlType="submit" onClick={onClick}>{children}</CustomButton>
    )
}