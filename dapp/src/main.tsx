import React from "react"
import ReactDOM from "react-dom/client"
import App from "./pages/App"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Index from "./pages"
import ErrorPage from "./pages/ErrorPage"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"
import SharePage from "./pages/SharePage"

import {
    hardhat,
    localhost,
    polygon,
    arbitrum,
    arbitrumGoerli,
} from "@wagmi/chains"
import {
    configureChains,
    mainnet,
    goerli,
    createClient,
    WagmiConfig,
} from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const apolloClient = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/41415/emofties-goerli/v0.0.1",
    cache: new InMemoryCache(),
})

const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [
        alchemyProvider({
            apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
            priority: 0,
        }),
        publicProvider({ priority: 1 }),
    ]
)

const wagmiClient = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Index /> },
                    { path: "home", element: <Index /> },
                    { path: "explore", element: <ExplorePage /> },
                    { path: "share", element: <SharePage /> },
                    { path: "profile", element: <ProfilePage /> },
                ],
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <WagmiConfig client={wagmiClient}>
                <RouterProvider router={router} />
            </WagmiConfig>
        </ApolloProvider>
    </React.StrictMode>
)
