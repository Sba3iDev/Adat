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
    faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
    return (
        <>
            <div className="header">
                <div className="nav">
                    <span>Adat</span>
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
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>Password Generator</span>
                    </Link>
                    <Link key={"/file-converter"} to={"/file-converter"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faFile} />
                        </span>
                        <span>File Converter</span>
                    </Link>
                    <Link key={"/unit-converter"} to={"/unit-converter"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faRuler} />
                        </span>
                        <span>Unit Converter</span>
                    </Link>
                    <Link key={"/qr-code"} to={"/qr-code"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faQrcode} />
                        </span>
                        <span>QR Code</span>
                    </Link>
                    <Link key={"/currency-converter"} to={"/currency-converter"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                        <span>Currency Converter</span>
                    </Link>
                    <Link key={"/calculator"} to={"/calculator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faCalculator} />
                        </span>
                        <span>Calculator</span>
                    </Link>
                    <Link key={"/color-picker"} to={"/color-picker"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faEyeDropper} />
                        </span>
                        <span>Color Picker</span>
                    </Link>
                    <Link key={"/numearl-system"} to={"/numearl-system"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faSquareBinary} />
                        </span>
                        <span>Numeral System</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool10</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool11</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool12</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool13</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool14</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool15</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool16</span>
                    </Link>
                    <Link key={"/password-generator"} to={"/password-generator"} className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool17</span>
                    </Link>
                </div>
            </div>
            <div className="move-up">
                <FontAwesomeIcon className="arrow" icon={faArrowUp} />
            </div>
        </>
    );
}

export default Home;
