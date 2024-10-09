import { ReactNode } from "react"
import { StoreProvider } from "./StoreProvider"
import { WebAppProvider } from "./WebAppProvider"

export const RootProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WebAppProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </WebAppProvider>
    )
}