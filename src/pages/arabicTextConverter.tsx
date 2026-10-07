import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopupMessage from "../components/popupMessage";
import ScrollToTopButton from "../components/scrollTopButton";
import Footer from "../components/footer";
import "../app.css";

const toChars = (codes: number[]): string[] => codes.map((c) => String.fromCharCode(c));

const FORMS: Record<string, string[]> = {
    ء: toChars([0xfe80]),
    آ: toChars([0xfe81, 0xfe82]),
    أ: toChars([0xfe83, 0xfe84]),
    ؤ: toChars([0xfe85, 0xfe86]),
    إ: toChars([0xfe87, 0xfe88]),
    ئ: toChars([0xfe89, 0xfe8a, 0xfe8b, 0xfe8c]),
    ا: toChars([0xfe8d, 0xfe8e]),
    ب: toChars([0xfe8f, 0xfe90, 0xfe91, 0xfe92]),
    ة: toChars([0xfe93, 0xfe94]),
    ت: toChars([0xfe95, 0xfe96, 0xfe97, 0xfe98]),
    ث: toChars([0xfe99, 0xfe9a, 0xfe9b, 0xfe9c]),
    ج: toChars([0xfe9d, 0xfe9e, 0xfe9f, 0xfea0]),
    ح: toChars([0xfea1, 0xfea2, 0xfea3, 0xfea4]),
    خ: toChars([0xfea5, 0xfea6, 0xfea7, 0xfea8]),
    د: toChars([0xfea9, 0xfeaa]),
    ذ: toChars([0xfeab, 0xfeac]),
    ر: toChars([0xfead, 0xfeae]),
    ز: toChars([0xfeaf, 0xfeb0]),
    س: toChars([0xfeb1, 0xfeb2, 0xfeb3, 0xfeb4]),
    ش: toChars([0xfeb5, 0xfeb6, 0xfeb7, 0xfeb8]),
    ص: toChars([0xfeb9, 0xfeba, 0xfebb, 0xfebc]),
    ض: toChars([0xfebd, 0xfebe, 0xfebf, 0xfec0]),
    ط: toChars([0xfec1, 0xfec2, 0xfec3, 0xfec4]),
    ظ: toChars([0xfec5, 0xfec6, 0xfec7, 0xfec8]),
    ع: toChars([0xfec9, 0xfeca, 0xfecb, 0xfecc]),
    غ: toChars([0xfecd, 0xfece, 0xfecf, 0xfed0]),
    ف: toChars([0xfed1, 0xfed2, 0xfed3, 0xfed4]),
    ق: toChars([0xfed5, 0xfed6, 0xfed7, 0xfed8]),
    ك: toChars([0xfed9, 0xfeda, 0xfedb, 0xfedc]),
    ل: toChars([0xfedd, 0xfede, 0xfedf, 0xfee0]),
    م: toChars([0xfee1, 0xfee2, 0xfee3, 0xfee4]),
    ن: toChars([0xfee5, 0xfee6, 0xfee7, 0xfee8]),
    ه: toChars([0xfee9, 0xfeea, 0xfeeb, 0xfeec]),
    و: toChars([0xfeed, 0xfeee]),
    ى: toChars([0xfeef, 0xfef0]),
    ي: toChars([0xfef1, 0xfef2, 0xfef3, 0xfef4]),
};

const LAM_ALEF: Record<string, string[]> = {
    ا: toChars([0xfefb, 0xfefc]),
    آ: toChars([0xfef5, 0xfef6]),
    أ: toChars([0xfef7, 0xfef8]),
    إ: toChars([0xfef9, 0xfefa]),
};

const DIACRITICS = /[\u064B-\u065F\u0670]/g;

const MIRROR: Record<string, string> = {
    "(": ")",
    ")": "(",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    "«": "»",
    "»": "«",
};

type Token = { forms: string[]; raw?: undefined } | { raw: string; forms?: undefined };

function reshape(text: string): string {
    const chars = [...text.replace(DIACRITICS, "")];
    const tokens: Token[] = [];
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        const nextChar = chars[i + 1];
        if (c === "ل" && nextChar && LAM_ALEF[nextChar]) {
            tokens.push({ forms: LAM_ALEF[nextChar] });
            i++;
        } else if (FORMS[c]) {
            tokens.push({ forms: FORMS[c] });
        } else {
            tokens.push({ raw: c });
        }
    }
    return tokens
        .map((t, i) => {
            if (!t.forms) return t.raw;
            const f = t.forms;
            const prev = tokens[i - 1];
            const next = tokens[i + 1];
            const joinPrev = !!prev?.forms && prev.forms.length === 4;
            const joinNext = f.length === 4 && !!next?.forms && next.forms.length > 1;
            if (f.length === 1) return f[0];
            if (f.length === 2) return joinPrev ? f[1] : f[0];
            if (joinPrev && joinNext) return f[3];
            if (joinPrev) return f[1];
            if (joinNext) return f[2];
            return f[0];
        })
        .join("");
}

function reverseVisual(line: string): string {
    const ltr = "A-Za-z0-9\\u0660-\\u0669";
    const re = new RegExp(`[${ltr}]+(?:[ .,:/%-]+[${ltr}]+)*|[\\s\\S]`, "gu");
    return (line.match(re) ?? [])
        .reverse()
        .map((tok) => (tok.length === 1 && MIRROR[tok] ? MIRROR[tok] : tok))
        .join("");
}

function fixArabic(text: string): string {
    return text
        .split("\n")
        .map((line) => reverseVisual(reshape(line)))
        .join("\n");
}

function ArabicTextConverter() {
    const [input, setInput] = useState("");
    const output = useMemo(() => fixArabic(input), [input]);
    const [trigger, setTrigger] = useState(0);
    function CopyToClipboard() {
        navigator.clipboard.writeText(output);
    }
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Arabic Text Converter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Make Arabic text displays correctly in apps without Arabic support</div>
                <label className="arabic-textarea-label" htmlFor="ar-input">
                    Arabic text:
                </label>
                <textarea id="ar-input" dir="rtl" lang="ar" value={input} onChange={(e) => setInput(e.target.value)} />
                <label className="arabic-textarea-label" htmlFor="ar-output">
                    Converted text:
                </label>
                <textarea id="ar-output" readOnly value={output} />
                <button
                    className="arabic-text-convert-btn"
                    onClick={() => {
                        CopyToClipboard();
                        if (output) {
                            setTrigger((prev) => prev + 1);
                        }
                    }}
                    disabled={!output}
                >
                    Copy converted text
                </button>
            </div>
            <PopupMessage message="Copied to clipboard" trigger={trigger} />
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default ArabicTextConverter;
