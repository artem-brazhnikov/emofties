import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, useDisclosure } from "@chakra-ui/react"

import { Web3Modal } from "@web3modal/react"
import { web3ModalConfig } from "../components/Web3ModalProfile"

import "@rainbow-me/rainbowkit/styles.css"
import { WagmiConfig } from "wagmi"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { getWagmiClient, getChains } from "../utils/WagmiUtils"

export default function App({ Component, pageProps }: AppProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Web3Modal
    // return (
    //     <ChakraProvider>
    //         <Component {...pageProps} />
    //         <Web3Modal config={web3ModalConfig} />
    //     </ChakraProvider>
    // )

    const chains = getChains()
    const { connectors } = getDefaultWallets({ appName: "Emofties", chains })
    const client = getWagmiClient(connectors)
    return (
        <ChakraProvider>
            <WagmiConfig client={client}>
                <RainbowKitProvider chains={chains} modalSize="compact">
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    )
}
