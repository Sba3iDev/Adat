import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import convert, { type Measure, type Unit } from "convert-units";
import "../app.css";

function UnitConverter() {
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);
    const [availableUnits, setAvailableUnits] = useState<{ value: string; label: string }[]>([]);
    const [fromUnit, setFromUnit] = useState<{ value: string; label: string } | null>(null);
    const [toUnit, setToUnit] = useState<{ value: string; label: string } | null>(null);
    const [inputValue, setInputValue] = useState<number>(1);
    const [convertedValue, setConvertedValue] = useState<string>("");
    useEffect(() => {
        const allMeasures = convert().measures();
        const formatted = allMeasures.map((m) => ({
            value: m,
            label: m.charAt(0).toUpperCase() + m.slice(1),
        }));
        setCategories(formatted);
        setSelectedCategory(formatted[0]);
    }, []);
    useEffect(() => {
        if (selectedCategory) {
            const units = convert().possibilities(selectedCategory.value as Measure);
            const formattedUnits = units.map((u) => ({
                value: u,
                label: u,
            }));
            setAvailableUnits(formattedUnits);
            setFromUnit(formattedUnits[0]);
            setToUnit(formattedUnits[1] || formattedUnits[0]);
        }
    }, [selectedCategory]);
    const handleConvert = () => {
        try {
            const result = convert(inputValue)
                .from(fromUnit?.value as Unit)
                .to(toUnit?.value as Unit);
            setConvertedValue(Number(result).toString());
        } catch (err) {
            setConvertedValue("Invalid conversion");
        }
    };
    function swapUnits() {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setConvertedValue("");
    }
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
                        <Select
                            className="custom-select category-select"
                            classNamePrefix="select"
                            options={categories}
                            value={selectedCategory}
                            onChange={(selected) => {
                                setSelectedCategory(selected);
                                setConvertedValue("");
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                    <label>
                        From:
                        <Select
                            className="custom-select unit-select"
                            classNamePrefix="select"
                            options={availableUnits}
                            value={fromUnit}
                            onChange={(selected) => {
                                setFromUnit(selected);
                                setConvertedValue("");
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                    <button onClick={swapUnits}>
                        <FontAwesomeIcon icon={faRightLeft} />
                    </button>
                    <label>
                        To:
                        <Select
                            className="custom-select unit-select"
                            classNamePrefix="select"
                            options={availableUnits}
                            value={toUnit}
                            onChange={(selected) => {
                                setToUnit(selected);
                                setConvertedValue("");
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
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
                        value={convertedValue ? `${convertedValue} ${toUnit?.value}` : ""}
                    />
                </div>
            </div>
        </>
    );
}

export default UnitConverter;
