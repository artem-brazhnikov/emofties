import Account from "./Account"
import NavBar from "./NavBar"
import Network from "./Network"

const Header = () => {
    return (
        <header className="flex justify-between bg-teal-200 p-5">
            <NavBar />
            <div className="flex items-center gap-2">
                <Network />
                <Account />
            </div>
        </header>
    )
}

export default Header
