import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";
import "../app.css";

function QRCode() {
    const [inputText, setInputText] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const handleCopyImage = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.toBlob(async (blob) => {
            if (!blob) return;
            try {
                await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
                alert("QR code copied to clipboard!");
            } catch (err) {
                console.error("Copy failed:", err);
                alert("Failed to copy QR code.");
            }
        });
    };
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.toBlob((blob) => {
            if (!blob) return;
            saveAs(blob, "qrcode.png");
        });
    };
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">QR Code Tool</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Generate QR Code</div>
                <div className="qr-section">
                    <div className="qr-form">
                        <input
                            className="qr-input"
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter text or URL"
                        />
                        <div className="qr-btns">
                            <button onClick={handleCopyImage}>
                                <FontAwesomeIcon icon={faCopy} /> Copy QR code
                            </button>
                            <button onClick={handleDownload}>
                                <FontAwesomeIcon icon={faDownload} /> Save as PNG
                            </button>
                        </div>
                    </div>
                    <div className="qr-code-wrapper" ref={divRef}>
                        <QRCodeSVG className={`${inputText.trim() ? "" : "hide-qr"}`} value={inputText} size={200} />
                    </div>
                    <QRCodeCanvas
                        className={`${inputText.trim() ? "" : "hide-qr"}`}
                        value={inputText}
                        size={256}
                        marginSize={3}
                        ref={canvasRef}
                        style={{ display: "none" }}
                    />
                </div>
            </div>
        </>
    );
}

export default QRCode;
