import { configureChains, chain, createClient, Connector } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { getDefaultProvider } from "ethers"

const { chains, provider, webSocketProvider } = configureChains(
    [chain.localhost, chain.goerli],
    [
        alchemyProvider({
            apiKey: "https://eth-goerli.g.alchemy.com/v2/R-eWeP3NgwNItKOpwnL972eb6A7aGWyA",
        }),
        publicProvider(),
    ]
)

let client: any

export function getWagmiClient(connectors: any) {
    if (!client) {
        client = createClient({
            autoConnect: true,
            provider,
            webSocketProvider,
            connectors,
        })
    }
    return client
}

export function getChains() {
    return chains
}
