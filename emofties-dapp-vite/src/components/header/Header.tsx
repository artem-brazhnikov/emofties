import Account from "./Account"
import NavBar from "./NavBar"

const Header = () => {
    return (
        <header className="flex justify-between">
            <NavBar />
            <Account />
        </header>
    )
}

export default Header
