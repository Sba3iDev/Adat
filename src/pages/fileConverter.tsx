import { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import mammoth from "mammoth";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../app.css";

const ffmpeg = createFFmpeg();
const conversionOptions = {
    image: ["png", "jpg", "webp", "bmp", "gif"],
    video: ["mp4", "avi", "webm", "mov", "mkv"],
    audio: ["mp3", "wav", "aac", "ogg", "flac"],
    document: ["pdf", "docx", "txt"],
};

function GetFileType(file: File) {
    const type = file.type;
    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.startsWith("audio/")) return "audio";
    if (type === "application/pdf" || type.includes("word") || type.includes("text")) return "document";
    return "unknown";
}

function FileConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState("");
    const [targetFormat, setTargetFormat] = useState("");
    const [loading, setLoading] = useState(false);
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setFileType(GetFileType(selected));
        setTargetFormat("");
    }
    async function Convert() {
        if (!file || !targetFormat) return;
        setLoading(true);
        const baseName = file.name.split(".").slice(0, -1).join(".");
        const outputName = `${baseName}.${targetFormat}`;
        try {
            if (["image", "video", "audio"].includes(fileType)) {
                if (!ffmpeg.isLoaded()) await ffmpeg.load();
                ffmpeg.FS("writeFile", file.name, await fetchFile(file));
                await ffmpeg.run("-i", file.name, outputName);
                const data = ffmpeg.FS("readFile", outputName);
                const blob = new Blob([data.buffer], { type: file.type });
                saveAs(blob, outputName);
            } else if (fileType === "document") {
                if (targetFormat === "txt") {
                    const text = await file.text();
                    const blob = new Blob([text], { type: "text/plain" });
                    saveAs(blob, outputName);
                } else if (targetFormat === "pdf") {
                    const pdfDoc = await PDFDocument.create();
                    const page = pdfDoc.addPage([600, 400]);
                    const text = await file.text();
                    page.drawText(text.slice(0, 500), { x: 50, y: 350 });
                    const pdfBytes = await pdfDoc.save();
                    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), outputName);
                } else if (targetFormat === "docx") {
                    const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
                    const blob = new Blob([result.value], {
                        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    });
                    saveAs(blob, outputName);
                }
            }
        } catch (err) {
            alert("Conversion failed. Check console for details.");
            console.error(err);
        }
        setLoading(false);
    }
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">File Converter</span>
                </div>
            </div>
            <div className="file-converter-tool">
                <input type="file" onChange={handleFileChange} />
                {file && (
                    <>
                        <div className="file-info">
                            <strong>File:</strong> {file.name} <br />
                            <strong>Type:</strong> {fileType}
                        </div>
                        <div className="format-select">
                            <label>Convert to:</label>
                            <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)}>
                                <option value="">-- Select Format --</option>
                                {conversionOptions[fileType as keyof typeof conversionOptions]?.map((fmt) => (
                                    <option key={fmt} value={fmt}>
                                        {fmt.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={Convert} disabled={loading || !targetFormat}>
                            {loading ? "Converting..." : "Convert File"}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default FileConverter;
