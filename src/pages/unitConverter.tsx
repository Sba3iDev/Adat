import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import convert, { type Measure, type Unit } from "convert-units";
import "../app.css";

function UnitConverter() {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Length");
    const [availableUnits, setAvailableUnits] = useState<string[]>([]);
    const [fromUnit, setFromUnit] = useState<string>("");
    const [toUnit, setToUnit] = useState<string>("");
    const [inputValue, setInputValue] = useState<number>(1);
    const [convertedValue, setConvertedValue] = useState<string>("");
    useEffect(() => {
        const allMeasures = convert().measures();
        setCategories(allMeasures.map((str: string) => str.charAt(0).toUpperCase() + str.slice(1)));
        setSelectedCategory(((str: string) => str.charAt(0).toUpperCase() + str.slice(1))(allMeasures[0]));
    }, []);
    useEffect(() => {
        if (selectedCategory) {
            const raw = selectedCategory[0].toLowerCase() + selectedCategory.slice(1);
            const units = convert().possibilities(raw as Measure);
            setAvailableUnits(units);
            setFromUnit(units[0]);
            setToUnit(units[1] || units[0]);
        }
    }, [selectedCategory]);
    const handleConvert = () => {
        try {
            const result = convert(inputValue)
                .from(fromUnit as Unit)
                .to(toUnit as Unit);
            setConvertedValue(Number(result).toString());
        } catch (err) {
            setConvertedValue("Invalid conversion");
        }
    };
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Unit Converter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Convert Units Instantly</div>
                <div className="unit-options">
                    <label>
                        Category:
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setConvertedValue("");
                            }}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        From:
                        <select
                            value={fromUnit}
                            onChange={(e) => {
                                setFromUnit(e.target.value);
                                setConvertedValue("");
                            }}
                        >
                            {availableUnits.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        To:
                        <select
                            value={toUnit}
                            onChange={(e) => {
                                setToUnit(e.target.value);
                                setConvertedValue("");
                            }}
                        >
                            {availableUnits.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Value:
                        <input type="number" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
                    </label>
                </div>
                <button className="convert-btn" onClick={handleConvert}>
                    Convert
                </button>
                <div className="result">
                    <span>Result:</span>
                    <input
                        className="converted-result"
                        type="text"
                        readOnly
                        size={"10000000000000000000000 mm".length}
                        value={`${convertedValue ? `${convertedValue} ${toUnit}` : ""}`}
                    />
                </div>
            </div>
        </>
    );
}

export default UnitConverter;
