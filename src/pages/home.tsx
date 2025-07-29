import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faFile,
    faRuler,
    faQrcode,
    faDollarSign,
    faEyeDropper,
    faCalculator,
    faSquareBinary,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/scrollTopButton";
import "../app.css";

function Home() {
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="title" key={"/"} to={"/"}>
                        Adat
                    </Link>
                </div>
                <div className="search">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="main-text">
                <span className="primary-text">Discover highly useful Tools</span>
                <span className="secondary-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis ea molestiae, laudantium doloribus
                    repellendus? Quos provident at dolore saepe expedita, laborum pariatur, perspiciatis, quia a animi corrupti
                    quibusdam similique.
                </span>
            </div>
            <div className="tools-container">
                <div className="tools">
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>Password Generator</span>
                    </Link>
                    <Link className="tool" key={"/file-converter"} to={"/file-converter"}>
                        <FontAwesomeIcon className="icon" icon={faFile} />
                        <span>File Converter</span>
                    </Link>
                    <Link className="tool" key={"/unit-converter"} to={"/unit-converter"}>
                        <FontAwesomeIcon className="icon" icon={faRuler} />
                        <span>Unit Converter</span>
                    </Link>
                    <Link className="tool" key={"/qr-code"} to={"/qr-code"}>
                        <FontAwesomeIcon className="icon" icon={faQrcode} />
                        <span>QR Code</span>
                    </Link>
                    <Link className="tool" key={"/currency-converter"} to={"/currency-converter"}>
                        <FontAwesomeIcon className="icon" icon={faDollarSign} />
                        <span>Currency Converter</span>
                    </Link>
                    <Link className="tool" key={"/calculator"} to={"/calculator"}>
                        <FontAwesomeIcon className="icon" icon={faCalculator} />
                        <span>Calculator</span>
                    </Link>
                    <Link className="tool" key={"/color-picker"} to={"/color-picker"}>
                        <FontAwesomeIcon className="icon" icon={faEyeDropper} />
                        <span>Color Picker</span>
                    </Link>
                    <Link className="tool" key={"/numearl-system"} to={"/numearl-system"}>
                        <FontAwesomeIcon className="icon" icon={faSquareBinary} />
                        <span>Numeral System</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool10</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool11</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool12</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool13</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool14</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool15</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool16</span>
                    </Link>
                    <Link className="tool" key={"/password-generator"} to={"/password-generator"}>
                        <FontAwesomeIcon className="icon" icon={faLock} />
                        <span>tool17</span>
                    </Link>
                </div>
            </div>
            <ScrollToTopButton />
        </>
    );
}

export default Home;
