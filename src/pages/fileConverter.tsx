import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import PopupMessage from "../components/popupMessage";
import Footer from "../components/footer";
import "../app.css";

const ffmpeg = createFFmpeg();
const conversionOptions = {
    image: ["png", "jpg", "webp", "bmp", "gif"],
    video: ["mp4", "avi", "webm", "mov", "mkv"],
    audio: ["mp3", "wav", "aac", "ogg", "flac"],
};

function GetFileType(file: File) {
    const type = file.type;
    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.startsWith("audio/")) return "audio";
    return "unknown";
}

function FileConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState("");
    const [targetFormat, setTargetFormat] = useState("");
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [trigger, setTrigger] = useState(0);
    function HandleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setFileType(GetFileType(selected));
        setTargetFormat("");
    }
    async function Convert() {
        if (!file || !targetFormat) return;
        setLoading(true);
        setFailed(false);
        const baseName = file.name.split(".").slice(0, -1).join(".");
        const outputName = `${baseName}.${targetFormat}`;
        try {
            if (["image", "video", "audio"].includes(fileType)) {
                if (!ffmpeg.isLoaded()) await ffmpeg.load();
                ffmpeg.FS("writeFile", file.name, await fetchFile(file));
                await ffmpeg.run("-i", file.name, outputName);
                const data = ffmpeg.FS("readFile", outputName);
                const uint8Data = new Uint8Array(data);
                const blob = new Blob([uint8Data], { type: file.type });
                saveAs(blob, outputName);
            }
        } catch (err) {
            console.error(err);
            setFailed(true);
        }
        setLoading(false);
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
                    <span className="tool-title">File Converter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Upload your media to convet it</div>
                <div className="file-upload-btn">
                    <input type="file" id="fileInput" onChange={HandleFileChange} />
                    <label htmlFor="fileInput">Click here to upload</label>
                </div>
                {file && (
                    <div className="file-details">
                        <div className="file-preview">
                            <span>{file.name}</span>
                            <span className={`failed-msg ${failed ? "visible" : ""}`}>Failed</span>
                            <span className="file-type">{fileType.toUpperCase()}</span>
                        </div>
                        <div className="format-select">
                            <label>Convert to:</label>
                            <Select
                                className="custom-select"
                                classNamePrefix="select"
                                value={targetFormat ? { value: targetFormat, label: targetFormat.toUpperCase() } : null}
                                onChange={(option) => setTargetFormat(option ? option.value : "")}
                                options={conversionOptions[fileType as keyof typeof conversionOptions]?.map((fmt) => ({
                                    value: fmt,
                                    label: fmt.toUpperCase(),
                                }))}
                                placeholder="Select format"
                                isClearable={false}
                            />
                        </div>
                        <button
                            onClick={() => {
                                Convert();
                                if (!failed) {
                                    setTrigger((prev) => prev + 1);
                                }
                            }}
                            disabled={loading || !targetFormat}
                        >
                            {loading ? "Converting..." : "Convert"}
                        </button>
                    </div>
                )}
            </div>
            <PopupMessage message="Convert file started" trigger={trigger} />
            <Footer />
        </>
    );
}

export default FileConverter;
