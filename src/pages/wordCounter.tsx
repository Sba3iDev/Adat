import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { detect } from "tinyld";
import ScrollToTopButton from "../components/scrollTopButton";
import Footer from "../components/footer";
import "../app.css";

interface CountOptions {
    locale?: string;
    caseSensitive?: boolean;
    ignoreDiacritics?: boolean;
}

type Direction = "ltr" | "rtl";

const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ckb"]);
const RTL_SCRIPT_REGEX =
    /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Samaritan}\p{Script=Mandaic}\p{Script=Nko}]/u;
const LTR_SCRIPT_REGEX =
    /[\p{Script=Latin}\p{Script=Greek}\p{Script=Cyrillic}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}\p{Script=Devanagari}]/u;

function detectLocale(text: string): string | undefined {
    if (/[\p{Script=Arabic}]/u.test(text)) return "ar";
    if (/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) return "ja";
    if (/\p{Script=Hangul}/u.test(text)) return "ko";
    if (/\p{Script=Han}/u.test(text)) return "zh";
    if (/\p{Script=Thai}/u.test(text)) return "th";
    if (/\p{Script=Greek}/u.test(text)) return "el";
    if (/\p{Script=Hebrew}/u.test(text)) return "he";
    const lang = detect(text);
    return lang || undefined;
}

function resolveLocale(text: string, word: string, opts: CountOptions): string | undefined {
    const candidate = opts.locale ?? detectLocale(`${text} ${word}`);
    if (!candidate) return undefined;
    try {
        return Intl.getCanonicalLocales(candidate)[0];
    } catch {
        return undefined;
    }
}

function normalize(input: string, locale: string | undefined, opts: CountOptions): string {
    let result = input.normalize("NFKC");
    if (opts.ignoreDiacritics) {
        result = result.normalize("NFD").replace(/\p{M}/gu, "").normalize("NFC");
    }
    if (!opts.caseSensitive) {
        result = result.toLocaleLowerCase(locale);
    }
    return result;
}

function tokenize(text: string, locale: string | undefined): string[] {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    const tokens: string[] = [];
    for (const { segment, isWordLike } of segmenter.segment(text)) {
        if (isWordLike) tokens.push(segment);
    }
    return tokens;
}

function getDirection(input?: string): Direction {
    if (!input || !input.trim()) return "ltr";
    const normalized = input.trim().toLowerCase();
    if (RTL_LANGUAGES.has(normalized)) return "rtl";
    for (const char of input) {
        if (RTL_SCRIPT_REGEX.test(char)) return "rtl";
        if (LTR_SCRIPT_REGEX.test(char)) return "ltr";
    }
    try {
        const loc = new Intl.Locale(input) as any;
        const info = loc.getTextInfo?.() ?? loc.textInfo;
        if (info?.direction === "rtl" || info?.direction === "ltr") return info.direction;
        if (RTL_LANGUAGES.has(loc.language)) return "rtl";
    } catch {
        // Not a locale tag
    }
    return "ltr";
}

function WordCounter() {
    const [text, setText] = useState("");
    const [word, setWord] = useState("");
    const [countNumber, setCountNumber] = useState(0);
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [diacriticsIgnored, setDiacriticsIgnored] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    function Count() {
        const locale = resolveLocale(text, word, { caseSensitive, ignoreDiacritics: diacriticsIgnored });
        const target = tokenize(normalize(word.trim(), locale, { caseSensitive, ignoreDiacritics: diacriticsIgnored }), locale);
        if (target.length === 0) {
            setCountNumber(0);
            return;
        }
        const tokens = tokenize(normalize(text, locale, { caseSensitive, ignoreDiacritics: diacriticsIgnored }), locale);
        let count = 0;
        for (let i = 0; i <= tokens.length - target.length; i++) {
            if (target.every((t, j) => tokens[i + j] === t)) {
                count++;
                i += target.length - 1;
            }
        }
        setCountNumber(count);
    }
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Word Counter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Count the word you want in a specific text</div>
                <div className="counter-field">
                    <label className="counter-label" htmlFor="counter-text">
                        Text:
                    </label>
                    <textarea
                        id="counter-text"
                        className="counter-textarea"
                        dir={getDirection(text)}
                        placeholder="Paste or type your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="counter-search-section">
                    <div className="counter-input-group">
                        <label className="counter-label" htmlFor="counter-word">
                            Word to count:
                        </label>
                        <input
                            id="counter-word"
                            className="counter-input"
                            dir={getDirection(word)}
                            placeholder="Enter word to count..."
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    Count();
                                }
                            }}
                        />
                    </div>
                    <div className="counter-options">
                        <label className="counter-checkbox-label">
                            <input type="checkbox" checked={caseSensitive} onChange={() => setCaseSensitive(!caseSensitive)} />
                            Case sensitive
                        </label>
                        <label className="counter-checkbox-label">
                            <input
                                type="checkbox"
                                checked={diacriticsIgnored}
                                onChange={() => setDiacriticsIgnored(!diacriticsIgnored)}
                            />
                            Ignore diacritics
                        </label>
                    </div>
                </div>
                <button className="word-count-btn" onClick={Count}>
                    Count
                </button>
                <div className="counter-result">
                    <span className="counter-result-label">Word counts:</span>
                    <input className="count-number-input" value={countNumber} readOnly />
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default WordCounter;
