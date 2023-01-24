import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"

function App() {
    return (
        <div className="App">
            <Header />
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default App
