import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faFile, faRuler, faQrcode, faDollarSign, faSquareBinary } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/scrollTopButton";
import Footer from "../components/footer";
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
        path: "/numeral-system",
        name: "Numeral System",
        icon: faSquareBinary,
    },
];

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="title" to="/">
                        Adat
                    </Link>
                </div>
            </div>
            <div className="main-text">
                <span className="primary-text">Tools That Make Life Easier</span>
                <span className="secondary-text">
                    Discover our collection of powerful web tools designed to streamline your daily tasks. We've got everything
                    you need in one place.
                </span>
            </div>
            <div className="tools-container">
                <div className="tools">
                    {tools
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((tool) => (
                            <Link className="tool" to={tool.path} key={tool.path}>
                                <FontAwesomeIcon className="icon" icon={tool.icon} />
                                <span>{tool.name}</span>
                            </Link>
                        ))}
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default Home;
