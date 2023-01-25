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
        <RouterProvider router={router} />
    </React.StrictMode>
)
