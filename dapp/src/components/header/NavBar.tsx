import { NavLink } from "react-router-dom"
import socialGraphImage from "../../../assets/emotions-social-graph.jpg"

const NavBar = () => {
    const evaluateNavLinkClass = ({ isActive }: any) =>
        isActive
            ? "bg-secondary-focus hover:text-accent active:bg-neutral rounded-md p-2"
            : "hover:text-accent active:bg-neutral rounded-md p-2"
    return (
        <nav className="flex gap-6">
            <NavLink to={"/"}>
                <img
                    className="rounded-3xl w-12 h-12"
                    src={socialGraphImage}
                    alt="Social Graph Image"
                />
            </NavLink>
            <NavLink className={evaluateNavLinkClass} to={"/home"}>
                Home
            </NavLink>
            <NavLink className={evaluateNavLinkClass} to={"/explore"}>
                Explore
            </NavLink>
            <NavLink className={evaluateNavLinkClass} to={"/share"}>
                Share
            </NavLink>
        </nav>
    )
}

export default NavBar
