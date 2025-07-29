import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../app.css";

function UnitConverter() {
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" key={"/"} to={"/"}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Unit Converter</span>
                </div>
                <div className="search">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </>
    );
}

export default UnitConverter;
