import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faFile,
    faRuler,
    faQrcode,
    faDollarSign,
    faEyeDropper,
    faSquareBinary,
    faSearch,
    faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/scrollTopButton";
import "../app.css";

const tools = [
    {
        path: "/password-generator",
        name: "Password Generator",
        icon: faLock,
    },
    {
        path: "/file-converter",
        name: "File Converter",
        icon: faFile,
    },
    {
        path: "/unit-converter",
        name: "Unit Converter",
        icon: faRuler,
    },
    {
        path: "/qr-code",
        name: "QR Code Generator",
        icon: faQrcode,
    },
    {
        path: "/currency-converter",
        name: "Currency Converter",
        icon: faDollarSign,
    },
    {
        path: "/color-picker",
        name: "Color Picker",
        icon: faEyeDropper,
    },
    {
        path: "/numeral-system",
        name: "Numeral System",
        icon: faSquareBinary,
    },
    {
        path: "/translator",
        name: "Translator",
        icon: faLanguage,
    },
];

function Home() {
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="title" to="/">
                        Adat
                    </Link>
                </div>
                <div className="search">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="main-text">
                <span className="primary-text">Tools That Make Life Easier</span>
                <span className="secondary-text">
                    Discover our collection of powerful web tools designed to streamline your daily tasks. From file conversion
                    to password generation, we've got everything you need in one place.
                </span>
            </div>
            <div className="tools-container">
                <div className="tools">
                    {tools.map((tool) => (
                        <Link className="tool" to={tool.path} key={tool.path}>
                            <FontAwesomeIcon className="icon" icon={tool.icon} />
                            <span>{tool.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <ScrollToTopButton />
        </>
    );
}

export default Home;
