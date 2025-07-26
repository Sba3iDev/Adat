import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faFile,
    faRuler,
    faQrcode,
    faDollarSign,
    faClock,
    faEyeDropper,
    faCalculator,
    faSquareBinary,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
    return (
        <>
            <div className="nav">
                <span>Adat</span>
                <span>Home</span>
                <span>About</span>
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
                        <span>tool2</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faRuler} />
                        </span>
                        <span>tool3</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faQrcode} />
                        </span>
                        <span>tool4</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                        <span>tool5</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faCalculator} />
                        </span>
                        <span>tool6</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faEyeDropper} />
                        </span>
                        <span>tool7</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faClock} />
                        </span>
                        <span>tool8</span>
                    </div>
                    <div className="tool">
                        <span>
                            <FontAwesomeIcon icon={faSquareBinary} />
                        </span>
                        <span>tool9</span>
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
                </div>
            </div>
        </>
    );
}

export default App;
