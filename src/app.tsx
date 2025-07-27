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
import "./App.css";

function App() {
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
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>Password Generator</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faFile} />
                        </span>
                        <span>File Converter</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faRuler} />
                        </span>
                        <span>Unit Converter</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faQrcode} />
                        </span>
                        <span>QR Code</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                        <span>Currency Converter</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faCalculator} />
                        </span>
                        <span>Calculator</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faEyeDropper} />
                        </span>
                        <span>Color Picker</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faSquareBinary} />
                        </span>
                        <span>Numeral System</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool10</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool11</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool12</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool13</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool14</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool15</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool16</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>tool17</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
