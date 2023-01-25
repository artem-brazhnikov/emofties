import Account from "./Account"
import NavBar from "./NavBar"

const Header = () => {
    return (
        <header className="flex justify-between bg-teal-200 p-5">
            <NavBar />
            <Account />
        </header>
    )
}

export default Header
