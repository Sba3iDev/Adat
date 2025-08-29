import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopupMessage from "../components/popupMessage";
import "../app.css";

function GeneratePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";
    let charSet = "";
    if (useUpper) charSet += upper;
    if (useLower) charSet += lower;
    if (useNumbers) charSet += numbers;
    if (useSymbols) charSet += symbols;
    if (!charSet) return "";
    return Array.from({ length }, () => charSet[Math.floor(Math.random() * charSet.length)]).join("");
}

function Password() {
    const [length, setLength] = useState(16);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [trigger, setTrigger] = useState(0);
    function Generate() {
        const newPass = GeneratePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
        setPassword(newPass);
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
    };
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Password Generator</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Customize your password</div>
                <div className="password-display">
                    <input value={password} readOnly />
                    <button
                        onClick={() => {
                            copyToClipboard();
                            if (password) {
                                setTrigger((prev) => prev + 1);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>
                <div className="password-options">
                    <label>
                        Length:
                        <input
                            type="number"
                            min="4"
                            max="50"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            onBlur={(e) => {
                                const val = parseInt(e.target.value);
                                if (isNaN(val)) return;
                                setLength(Math.max(parseInt(e.target.min), Math.min(parseInt(e.target.max), val)));
                            }}
                        />
                    </label>
                    <label>
                        <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} />
                        Uppercase
                    </label>
                    <label>
                        <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} />
                        Lowercase
                    </label>
                    <label>
                        <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                        Symbols
                    </label>
                </div>
                <button className="password-generate-btn" onClick={Generate}>
                    Generate Password
                </button>
            </div>
            <PopupMessage message="Copied to clipboard" trigger={trigger} />
        </>
    );
}

export default Password;
