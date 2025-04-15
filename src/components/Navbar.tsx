import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "LanguageContext";
import resources from "../resources"

function Navbar() {

    const { language } = useLanguage()
    const t = resources[language]

    const location = useLocation();

    const linkStyle = (path: string) =>
        location.pathname === path
            ? "text-orange-500 font-semibold"
            : "text-gray-700 hover:text-orange-500";

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">
                Digital Menu
            </Link>
            <div className="space-x-6 text-lg">
                <Link to="/" className={linkStyle("/")}>
                    {t.navbar.home}
                </Link>
                <Link to="/menu" className={linkStyle("/menu")}>
                    {t.navbar.menu}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
