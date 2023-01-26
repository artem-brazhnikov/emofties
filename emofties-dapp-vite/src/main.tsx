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
    avalanche,
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

const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli, polygon, avalanche, arbitrum, arbitrumGoerli],
    [publicProvider()]
    //todo: add alchemy and infura providers
)
console.log("Main chains", chains)

const client = createClient({
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
        <WagmiConfig client={client}>
            <RouterProvider router={router} />
        </WagmiConfig>
    </React.StrictMode>
)
