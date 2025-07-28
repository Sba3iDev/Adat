import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../app.css";

function Password() {
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
        </>
    );
}

export default Password;
