import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";
import PopupMessage from "../components/popupMessage";
import Footer from "../components/footer";
import "../app.css";

function QRCode() {
    const [inputText, setInputText] = useState("");
    const [trigger1, setTrigger1] = useState(0);
    const [trigger2, setTrigger2] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    async function CopyQrcode() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.toBlob(async (blob) => {
            if (!blob) return;
            try {
                await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            } catch (err) {
                console.error("Copy failed:", err);
            }
        });
    }
    function DownloadQrcode() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.toBlob((blob) => {
            if (!blob) return;
            saveAs(blob, "qrcode.png");
        });
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
                    <span className="tool-title">QR Code Generator</span>
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
                            <button
                                disabled={!inputText}
                                onClick={() => {
                                    CopyQrcode();
                                    setTrigger1((prev) => prev + 1);
                                }}
                            >
                                <FontAwesomeIcon icon={faCopy} /> Copy QR code
                            </button>
                            <button
                                disabled={!inputText}
                                onClick={() => {
                                    DownloadQrcode();
                                    setTrigger2((prev) => prev + 1);
                                }}
                            >
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
            <PopupMessage message="Copied to clipboard" trigger={trigger1} />
            <PopupMessage message="QR code saved" trigger={trigger2} />
            <Footer />
        </>
    );
}

export default QRCode;
