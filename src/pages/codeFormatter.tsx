import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import * as prettier from "prettier/standalone";
import type { Plugin } from "prettier";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as typescript from "prettier/plugins/typescript";
import * as postcss from "prettier/plugins/postcss";
import * as html from "prettier/plugins/html";
import * as markdown from "prettier/plugins/markdown";
import * as yaml from "prettier/plugins/yaml";
import * as graphql from "prettier/plugins/graphql";
import PopupMessage from "../components/popupMessage";
import ScrollToTopButton from "../components/scrollTopButton";
import Footer from "../components/footer";
import "../app.css";

type LanguageId =
    | "typescript"
    | "tsx"
    | "javascript"
    | "jsx"
    | "json"
    | "css"
    | "scss"
    | "less"
    | "html"
    | "markdown"
    | "yaml"
    | "graphql"
    | "python"
    | "java"
    | "c"
    | "go"
    | "rust"
    | "sql"
    | "shell"
    | "unknown";

interface LanguageInfo {
    label: string;
    parser: string | null;
}

const LANGUAGES: Record<LanguageId, LanguageInfo> = {
    typescript: { label: "TypeScript", parser: "typescript" },
    tsx: { label: "TSX", parser: "typescript" },
    javascript: { label: "JavaScript", parser: "babel" },
    jsx: { label: "JSX", parser: "babel" },
    json: { label: "JSON", parser: "json" },
    css: { label: "CSS", parser: "css" },
    scss: { label: "SCSS", parser: "scss" },
    less: { label: "Less", parser: "less" },
    html: { label: "HTML", parser: "html" },
    markdown: { label: "Markdown", parser: "markdown" },
    yaml: { label: "YAML", parser: "yaml" },
    graphql: { label: "GraphQL", parser: "graphql" },
    python: { label: "Python", parser: null },
    java: { label: "Java", parser: null },
    c: { label: "C / C++", parser: null },
    go: { label: "Go", parser: null },
    rust: { label: "Rust", parser: null },
    sql: { label: "SQL", parser: null },
    shell: { label: "Shell", parser: null },
    unknown: { label: "Unknown", parser: null },
};

interface LanguageOption {
    value: LanguageId | "auto";
    label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
    { value: "auto", label: "Auto-detect" },
    ...(Object.keys(LANGUAGES) as LanguageId[])
        .filter((id) => id !== "unknown" && LANGUAGES[id].parser)
        .map((id) => ({
            value: id,
            label: LANGUAGES[id].label,
        })),
];

interface IndentOption {
    value: number;
    label: string;
}

const INDENT_OPTIONS: IndentOption[] = [
    { value: 2, label: "2 spaces" },
    { value: 4, label: "4 spaces" },
    { value: 8, label: "8 spaces" },
];

const PLUGINS: Plugin[] = [babel, estree, typescript, postcss, html, markdown, yaml, graphql] as Plugin[];
type Rule = [LanguageId, RegExp, number];

const RULES: Rule[] = [
    // TypeScript
    ["typescript", /\b(interface|type)\s+\w+\s*(<[^>]*>)?\s*[={]/, 4],
    ["typescript", /:\s*(string|number|boolean|void|unknown|any|never)\b/, 4],
    ["typescript", /\b(enum|namespace|implements|readonly|abstract)\b/, 3],
    ["typescript", /\bas\s+(const|\w+)\b/, 1],
    // JavaScript / JSX
    ["javascript", /\b(const|let|var)\s+\w+\s*=/, 3],
    ["javascript", /=>/, 2],
    ["javascript", /\b(function\s*\w*\s*\(|console\.\w+|require\(|module\.exports)/, 3],
    ["javascript", /\b(import|export)\b.*\bfrom\b/, 2],
    ["jsx", /return\s*\(?\s*<\w/, 4],
    ["jsx", /<\w[\w.]*[^>]*\/>/, 2],
    ["jsx", /\bclassName=/, 3],
    // JSON
    ["json", /"[^"\n]+"\s*:\s*("|\d|true|false|null|\{|\[)/, 4],
    // CSS family
    ["css", /[.#]?[\w-]+\s*\{[^}]*:\s*[^}]+;?[^}]*\}/, 3],
    ["css", /@(media|keyframes|font-face|import|charset)\b/, 3],
    ["scss", /\$[\w-]+\s*:|@(mixin|include|extend|use)\b|&:[\w-]+|&\./, 5],
    ["less", /@[\w-]+\s*:|\.[\w-]+\s*\(\s*\)\s*;|~"/, 5],
    // HTML
    ["html", /<!DOCTYPE\s+html/i, 8],
    ["html", /<\/?(html|head|body|div|span|p|a|ul|li|script|style|section|h[1-6])\b/i, 3],
    // Markdown
    ["markdown", /^#{1,6}\s+\S/m, 4],
    ["markdown", /^\s*([-*+]|\d+\.)\s+\S/m, 1],
    ["markdown", /\[[^\]]+\]\([^)]+\)/, 3],
    ["markdown", /^```/m, 4],
    // YAML
    ["yaml", /^[\w-]+:\s*(\S.*)?$/m, 2],
    ["yaml", /^\s*-\s+[\w-]+:\s/m, 3],
    ["yaml", /^---\s*$/m, 3],
    // GraphQL
    ["graphql", /\b(query|mutation|subscription|fragment)\s+\w*\s*[({]/, 5],
    ["graphql", /\btype\s+\w+\s*\{[^}]*:\s*[\w![\]]+/, 4],
    ["graphql", /\bschema\s*\{/, 4],
    // Unformattable (detected only, so we can tell the user)
    ["python", /^\s*def\s+\w+\s*\(.*\)\s*(->.*)?:\s*$/m, 6],
    ["python", /^\s*(import\s+\w+|from\s+\w+\s+import)\b/m, 3],
    ["python", /^\s*(elif|except|self\.|print\()/m, 3],
    ["java", /\bpublic\s+(static\s+)?(class|void|int|String)\b/, 6],
    ["java", /System\.out\.print/, 5],
    ["c", /#include\s*[<"]/, 6],
    ["c", /\b(int|void)\s+main\s*\(/, 5],
    ["go", /^package\s+\w+/m, 5],
    ["go", /\bfunc\s+(\(\w+\s+\*?\w+\)\s+)?\w+\(/, 5],
    ["go", /:=/, 3],
    ["rust", /\bfn\s+\w+\s*(<[^>]*>)?\(/, 5],
    ["rust", /\blet\s+mut\b|println!\(|impl\s+\w+/, 4],
    ["sql", /\b(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE)\b/i, 6],
    ["shell", /^#!\/(usr\/)?bin\/(env\s+)?(ba|z)?sh/m, 8],
    ["shell", /^\s*(sudo|apt|npm|cd|ls|echo|export)\s/m, 2],
];

function detectLanguage(code: string): LanguageId {
    const text = code.trim();
    if (!text) return "unknown";
    if (/^[{[]/.test(text)) {
        try {
            JSON.parse(text);
            return "json";
        } catch {
            // Ignore JSON parse error and continue detection
        }
    }
    const scores = new Map<LanguageId, number>();
    for (const [lang, re, weight] of RULES) {
        if (re.test(text)) scores.set(lang, (scores.get(lang) ?? 0) + weight);
    }
    const ts = scores.get("typescript") ?? 0;
    const js = scores.get("javascript") ?? 0;
    const jsx = scores.get("jsx") ?? 0;
    const hasMarkup = jsx >= 2 && /<\w[\w.]*(\s[^>]*)?\/?>/.test(text);
    if (ts >= 3) {
        scores.delete("javascript");
        scores.delete("jsx");
        scores.delete("typescript");
        scores.set(hasMarkup ? "tsx" : "typescript", ts + js + jsx);
    } else if (js + jsx > 0) {
        scores.delete("javascript");
        scores.delete("jsx");
        scores.set(hasMarkup ? "jsx" : "javascript", js + jsx);
    }
    let best: LanguageId = "unknown";
    let bestScore = 0;
    for (const [lang, score] of scores) {
        if (score > bestScore) {
            best = lang;
            bestScore = score;
        }
    }
    return bestScore >= 3 ? best : "unknown";
}

async function formatCode(
    code: string,
    lang: LanguageId,
    opts: { tabWidth: number; semi: boolean; singleQuote: boolean; printWidth: number },
): Promise<string> {
    const { parser } = LANGUAGES[lang];
    if (!parser) {
        throw new Error(`${LANGUAGES[lang].label} can't be formatted by this tool yet.`);
    }
    return prettier.format(code, { parser, plugins: PLUGINS, ...opts });
}

function CodeFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [override, setOverride] = useState<LanguageId | "auto">("auto");
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [tabWidth, setTabWidth] = useState(2);
    const [semi, setSemi] = useState(true);
    const [singleQuote, setSingleQuote] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const detected = useMemo(() => detectLanguage(input), [input]);
    const active: LanguageId = override === "auto" ? detected : override;
    async function FormatCode() {
        setBusy(true);
        setError(null);
        try {
            const result = await formatCode(input, active, {
                tabWidth,
                semi,
                singleQuote,
                printWidth: 80,
            });
            setOutput(result);
        } catch (e) {
            setOutput("");
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setBusy(false);
        }
    }
    function CopyToClipboard() {
        navigator.clipboard.writeText(output);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const canFormat = input.trim().length > 0 && !busy;
    return (
        <>
            <div className="header">
                <div className="nav">
                    <Link className="back-arrow" to="/">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                    <span className="tool-title">Code Formatter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Format your code</div>
                <div className="code-options">
                    <label>
                        Language:
                        <Select
                            className="custom-select language-select"
                            classNamePrefix="select"
                            options={LANGUAGE_OPTIONS}
                            value={LANGUAGE_OPTIONS.find((opt) => opt.value === override)}
                            onChange={(selected) => {
                                if (selected) {
                                    setOverride(selected.value);
                                }
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                    <label>
                        Indent:
                        <Select
                            className="custom-select indent-select"
                            classNamePrefix="select"
                            options={INDENT_OPTIONS}
                            value={INDENT_OPTIONS.find((opt) => opt.value === tabWidth)}
                            onChange={(selected) => {
                                if (selected) {
                                    setTabWidth(selected.value);
                                }
                            }}
                            isClearable={false}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                        />
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" checked={semi} onChange={(e) => setSemi(e.target.checked)} />
                        Semicolons
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" checked={singleQuote} onChange={(e) => setSingleQuote(e.target.checked)} />
                        Single quotes
                    </label>
                </div>
                <button className="format-code-btn" onClick={FormatCode} disabled={!canFormat}>
                    {busy ? "Formatting…" : "Format"}
                </button>
                <div className="code-editors-container">
                    <div className="code-editor-box">
                        <div className="code-editor-header">
                            <span className="code-editor-title">Input Code</span>
                            <span className="format-code-badge" data-testid="detected">
                                {override === "auto" ? "Detected" : "Language"}: {LANGUAGES[active].label}
                            </span>
                        </div>
                        <textarea
                            className="code-textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            spellCheck={false}
                            placeholder="Paste your code here"
                        />
                    </div>
                    <div className="code-editor-box">
                        <div className="code-editor-header">
                            <span className="code-editor-title">Formatted Code</span>
                            <button
                                className="code-copy-btn"
                                onClick={() => {
                                    CopyToClipboard();
                                    if (output) {
                                        setTrigger((prev) => prev + 1);
                                    }
                                }}
                                disabled={!output}
                            >
                                <FontAwesomeIcon icon={faCopy} /> Copy
                            </button>
                        </div>
                        {error ? (
                            <pre className="code-error" role="alert">
                                {error}
                            </pre>
                        ) : (
                            <textarea
                                className="code-textarea"
                                value={output}
                                readOnly
                                spellCheck={false}
                                placeholder="Formatted code appears here"
                            />
                        )}
                    </div>
                </div>
            </div>
            <PopupMessage message="Copied to clipboard" trigger={trigger} />
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default CodeFormatter;
