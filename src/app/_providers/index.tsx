import { ReactNode } from "react"
import { TonConnectProvider } from "./TonConnectProvider"
import { StoreProvider } from "./StoreProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TonConnectProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </TonConnectProvider>
    )
}