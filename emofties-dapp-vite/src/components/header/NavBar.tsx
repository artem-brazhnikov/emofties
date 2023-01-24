import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="flex gap-6">
            <Link to={"/"}>Logo{/* image */}</Link>
            <Link to={"/"}>Home</Link>
            <Link to={"/explore"}>Explore</Link>
            <Link to={"/share"}>Share</Link>
        </nav>
    )
}

export default NavBar
