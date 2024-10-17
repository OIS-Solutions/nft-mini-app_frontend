import { ReactNode } from "react"
import { StoreProvider } from "./StoreProvider"
import { TelegramProvider } from "./TelegramProvider"
//import { WebAppProvider } from "./WebAppProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (

        <StoreProvider>
            <TelegramProvider>
                {children}
            </TelegramProvider>
        </StoreProvider>

    )
}