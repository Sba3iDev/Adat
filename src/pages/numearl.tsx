import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import Footer from "../components/footer";
import "../app.css";

function Numeral() {
    const [systems, setSystems] = useState<{ value: number; label: string }[]>([]);
    const [fromSystem, setFromSystem] = useState<{ value: number; label: string } | null>(null);
    const [toSystem, setToSystem] = useState<{ value: number; label: string } | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [convertedNumber, setConvertedNumber] = useState<string>("");
    useEffect(() => {
        setSystems([
            { value: 2, label: "Binary" },
            { value: 8, label: "Octal" },
            { value: 10, label: "Decimal" },
            { value: 16, label: "Hexaecimal" },
        ]);
    }, []);
    useEffect(() => {
        setFromSystem(systems[2]);
        setToSystem(systems[0]);
    }, [systems]);
    function ConvertNumber() {
        if (!inputValue?.trim()) {
            setConvertedNumber("");
            return;
        }
        try {
            const fromBase = Number(fromSystem?.value);
            const toBase = Number(toSystem?.value);
            let result;
            if (fromBase === 10) {
                const parsedNumber = parseFloat(inputValue);
                if (isNaN(parsedNumber)) {
                    result = "Invalid input";
                } else {
                    result = parsedNumber.toString(toBase);
                }
            } else {
                const parsedNumber = parseInt(inputValue, fromBase);
                if (isNaN(parsedNumber)) {
                    result = "Invalid input";
                } else {
                    result = parsedNumber.toString(toBase);
                }
            }
            setConvertedNumber(result);
        } catch {
            setConvertedNumber("Invalid input");
        }
    }
    function SwapUnits() {
        setFromSystem(toSystem);
        setToSystem(fromSystem);
        setConvertedNumber("");
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Numeral System</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Convert between numeral systems</div>
                <div className="system-options">
                    <label>
                        Value:
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </label>
                    <label>
                        From:
                        <Select
                            className="custom-select system-select"
                            classNamePrefix="select"
                            options={systems}
                            value={fromSystem}
                            onChange={(selected) => {
                                setFromSystem(selected);
                                setConvertedNumber("");
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                    <button onClick={SwapUnits}>
                        <FontAwesomeIcon icon={faRightLeft} />
                    </button>
                    <label>
                        To:
                        <Select
                            className="custom-select system-select"
                            classNamePrefix="select"
                            options={systems}
                            value={toSystem}
                            onChange={(selected) => {
                                setToSystem(selected);
                                setConvertedNumber("");
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                </div>
                <button className="convert-btn" onClick={ConvertNumber}>
                    Convert
                </button>
                <div className="result">
                    <span>Result:</span>
                    <input
                        className="converted-output"
                        type="text"
                        readOnly
                        size={"10000000000000000000000".length}
                        value={convertedNumber.toUpperCase()}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Numeral;
