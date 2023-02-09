import { NavLink } from "react-router-dom"

const NavBar = () => {
    const evaluateNavLinkClass = ({ isActive, isPending }: any) =>
        isActive
            ? "text-blue-900 bg-teal-100 rounded-md p-2"
            : isPending
            ? "text-blue-900 p-2"
            : "hover:text-teal-100 p-2"
    return (
        <nav className="flex gap-6">
            <NavLink className="p-2" to={"/"}>
                <img
                    className=" w-8 h-8"
                    src="/assets/emotions-social-graph.jpg"
                    alt=""
                />
            </NavLink>
            <NavLink className={evaluateNavLinkClass} to={"/"}>
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