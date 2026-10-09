import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select, { createFilter } from "react-select";
import Flag from "react-world-flags";
import euFlag from "../assets/svgs/eu.svg";
import ScrollToTopButton from "../components/scrollTopButton";
import Footer from "../components/footer";
import "../app.css";

interface CurrencyOption {
    value: string;
    label: string;
    country: string;
}

const currencyToFlag: Record<string, string> = {
    aed: "ae",
    afn: "af",
    all: "al",
    amd: "am",
    ang: "cw",
    aoa: "ao",
    ars: "ar",
    ats: "at",
    aud: "au",
    awg: "aw",
    azm: "az",
    bam: "ba",
    bbd: "bb",
    bdt: "bd",
    bef: "be",
    bgn: "bg",
    bhd: "bh",
    bif: "bi",
    bmd: "bm",
    bnd: "bn",
    bob: "bo",
    brl: "br",
    bsd: "bs",
    btn: "bt",
    bwp: "bw",
    byn: "by",
    bzd: "bz",
    cad: "ca",
    cdf: "cd",
    chf: "ch",
    clp: "cl",
    cnh: "cn",
    cop: "co",
    crc: "cr",
    cuc: "cu",
    cve: "cv",
    cyp: "cy",
    czk: "cz",
    djf: "dj",
    dkk: "dk",
    dop: "do",
    dzd: "dz",
    eek: "ee",
    egp: "eg",
    ern: "er",
    esp: "es",
    etb: "et",
    eur: "eu",
    fim: "fi",
    fjd: "fj",
    fkp: "fk",
    frf: "fr",
    gbp: "gb",
    gel: "ge",
    ggp: "gg",
    ghc: "gh",
    gip: "gi",
    gmd: "gm",
    gnf: "gn",
    grd: "gr",
    gtq: "gt",
    gyd: "gy",
    hkd: "hk",
    hnl: "hn",
    hrk: "hr",
    htg: "ht",
    huf: "hu",
    idr: "id",
    iep: "ie",
    imp: "im",
    inr: "in",
    iqd: "iq",
    irr: "ir",
    isk: "is",
    itl: "it",
    jep: "je",
    jmd: "jm",
    jod: "jo",
    jpy: "jp",
    kes: "ke",
    kgs: "kg",
    khr: "kh",
    kmf: "km",
    kpw: "kp",
    krw: "kr",
    kwd: "kw",
    kyd: "ky",
    kzt: "kz",
    lak: "la",
    lbp: "lb",
    lkr: "lk",
    lrd: "lr",
    lsl: "ls",
    ltl: "lt",
    luf: "lu",
    lvl: "lv",
    lyd: "ly",
    mad: "ma",
    mdl: "md",
    mga: "mg",
    mkd: "mk",
    mmk: "mm",
    mnt: "mn",
    mop: "mo",
    mro: "mr",
    mtl: "mt",
    mur: "mu",
    mvr: "mv",
    mwk: "mw",
    mxn: "mx",
    myr: "my",
    mzm: "mz",
    nad: "na",
    ngn: "ng",
    nio: "ni",
    nlg: "nl",
    nok: "no",
    npr: "np",
    nzd: "nz",
    omr: "om",
    pab: "pa",
    pen: "pe",
    pgk: "pg",
    php: "ph",
    pkr: "pk",
    pln: "pl",
    pte: "pt",
    pyg: "py",
    qar: "qa",
    rol: "ro",
    rsd: "rs",
    rub: "ru",
    rwf: "rw",
    sar: "sa",
    sbd: "sb",
    scr: "sc",
    sdd: "sd",
    sek: "se",
    sgd: "sg",
    shp: "sh",
    sit: "si",
    skk: "sk",
    sle: "sl",
    sos: "so",
    srd: "sr",
    std: "st",
    svc: "sv",
    syp: "sy",
    szl: "sz",
    thb: "th",
    tjs: "tj",
    tmm: "tm",
    tnd: "tn",
    top: "to",
    try: "tr",
    ttd: "tt",
    tvd: "tv",
    twd: "tw",
    tzs: "tz",
    uah: "ua",
    ugx: "ug",
    usd: "us",
    uyu: "uy",
    uzs: "uz",
    val: "va",
    veb: "ve",
    vnd: "vn",
    vuv: "vu",
    wst: "ws",
    xaf: "cm",
    xcd: "ag",
    xof: "sn",
    xpf: "pf",
    yer: "ye",
    zar: "za",
    zmk: "zm",
    zwd: "zw",
};

const countries: Record<string, string> = {
    aed: "United Arab Emirates",
    afn: "Afghanistan",
    all: "Albania",
    amd: "Armenia",
    ang: "Curaçao",
    aoa: "Angola",
    ars: "Argentina",
    ats: "Austria",
    aud: "Australia",
    awg: "Aruba",
    azm: "Azerbaijan",
    bam: "Bosnia and Herzegovina",
    bbd: "Barbados",
    bdt: "Bangladesh",
    bef: "Belgium",
    bgn: "Bulgaria",
    bhd: "Bahrain",
    bif: "Burundi",
    bmd: "Bermuda",
    bnd: "Brunei",
    bob: "Bolivia",
    brl: "Brazil",
    bsd: "Bahamas",
    btn: "Bhutan",
    bwp: "Botswana",
    byn: "Belarus",
    bzd: "Belize",
    cad: "Canada",
    cdf: "Democratic Republic of the Congo",
    chf: "Switzerland",
    clp: "Chile",
    cnh: "China",
    cop: "Colombia",
    crc: "Costa Rica",
    cuc: "Cuba",
    cve: "Cape Verde",
    cyp: "Cyprus",
    czk: "Czech Republic",
    djf: "Djibouti",
    dkk: "Denmark",
    dop: "Dominican Republic",
    dzd: "Algeria",
    eek: "Estonia",
    egp: "Egypt",
    ern: "Eritrea",
    esp: "Spain",
    etb: "Ethiopia",
    eur: "European Union",
    fim: "Finland",
    fjd: "Fiji",
    fkp: "Falkland Islands",
    frf: "France",
    gbp: "United Kingdom",
    gel: "Georgia",
    ggp: "Guernsey",
    ghc: "Ghana",
    gip: "Gibraltar",
    gmd: "Gambia",
    gnf: "Guinea",
    grd: "Greece",
    gtq: "Guatemala",
    gyd: "Guyana",
    hkd: "Hong Kong",
    hnl: "Honduras",
    hrk: "Croatia",
    htg: "Haiti",
    huf: "Hungary",
    idr: "Indonesia",
    iep: "Ireland",
    imp: "Isle of Man",
    inr: "India",
    iqd: "Iraq",
    irr: "Iran",
    isk: "Iceland",
    itl: "Italy",
    jep: "Jersey",
    jmd: "Jamaica",
    jod: "Jordan",
    jpy: "Japan",
    kes: "Kenya",
    kgs: "Kyrgyzstan",
    khr: "Cambodia",
    kmf: "Comoros",
    kpw: "North Korea",
    krw: "South Korea",
    kwd: "Kuwait",
    kyd: "Cayman Islands",
    kzt: "Kazakhstan",
    lak: "Laos",
    lbp: "Lebanon",
    lkr: "Sri Lanka",
    lrd: "Liberia",
    lsl: "Lesotho",
    ltl: "Lithuania",
    luf: "Luxembourg",
    lvl: "Latvia",
    lyd: "Libya",
    mad: "Morocco",
    mdl: "Moldova",
    mga: "Madagascar",
    mkd: "North Macedonia",
    mmk: "Myanmar",
    mnt: "Mongolia",
    mop: "Macau",
    mro: "Mauritania",
    mtl: "Malta",
    mur: "Mauritius",
    mvr: "Maldives",
    mwk: "Malawi",
    mxn: "Mexico",
    myr: "Malaysia",
    mzm: "Mozambique",
    nad: "Namibia",
    ngn: "Nigeria",
    nio: "Nicaragua",
    nlg: "Netherlands",
    nok: "Norway",
    npr: "Nepal",
    nzd: "New Zealand",
    omr: "Oman",
    pab: "Panama",
    pen: "Peru",
    pgk: "Papua New Guinea",
    php: "Philippines",
    pkr: "Pakistan",
    pln: "Poland",
    pte: "Portugal",
    pyg: "Paraguay",
    qar: "Qatar",
    rol: "Romania",
    rsd: "Serbia",
    rub: "Russia",
    rwf: "Rwanda",
    sar: "Saudi Arabia",
    sbd: "Solomon Islands",
    scr: "Seychelles",
    sdd: "Sudan",
    sek: "Sweden",
    sgd: "Singapore",
    shp: "Saint Helena",
    sit: "Slovenia",
    skk: "Slovakia",
    sle: "Sierra Leone",
    sos: "Somalia",
    srd: "Suriname",
    std: "São Tomé and Príncipe",
    svc: "El Salvador",
    syp: "Syria",
    szl: "Eswatini",
    thb: "Thailand",
    tjs: "Tajikistan",
    tmm: "Turkmenistan",
    tnd: "Tunisia",
    top: "Tonga",
    try: "Turkey",
    ttd: "Trinidad and Tobago",
    tvd: "Tuvalu",
    twd: "Taiwan",
    tzs: "Tanzania",
    uah: "Ukraine",
    ugx: "Uganda",
    usd: "United States",
    uyu: "Uruguay",
    uzs: "Uzbekistan",
    val: "Vatican City",
    veb: "Venezuela",
    vnd: "Vietnam",
    vuv: "Vanuatu",
    wst: "Samoa",
    xaf: "Cameroon",
    xcd: "Antigua and Barbuda",
    xof: "Senegal",
    xpf: "French Polynesia",
    yer: "Yemen",
    zar: "South Africa",
    zmk: "Zambia",
    zwd: "Zimbabwe",
};

const filterByCountry = createFilter<CurrencyOption>({
    stringify: (option) => `${option.data.country} ${option.data.value} ${option.data.label}`,
});

function formatCurrency(value: number): string {
    if (value === 0) return "0.00";
    const abs = Math.abs(value);
    if (abs >= 0.01) return value.toFixed(2);
    const decimals = Math.min(20, -Math.floor(Math.log10(abs)));
    return value.toFixed(decimals);
}

function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState<CurrencyOption>({
        value: "usd",
        label: "USD",
        country: countries["usd"],
    });
    const [toCurrency, setToCurrency] = useState<CurrencyOption>({
        value: "eur",
        label: "EUR",
        country: countries["eur"],
    });
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currenciesName, setCurrenciesName] = useState<Record<string, string>>({});
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    useEffect(() => {
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
            .then((res) => res.json())
            .then((data) => {
                const currencyList = Object.keys(data);
                setCurrencies(currencyList.filter((curr) => currencyToFlag[curr]).sort());
                setCurrenciesName(data);
            });
    }, []);
    useEffect(() => {
        if (fromCurrency?.value) {
            fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.value}.json`)
                .then((res) => res.json())
                .then((data) => {
                    setRates(data[fromCurrency.value]);
                });
        }
    }, [fromCurrency]);
    function ConvertCurrrency() {
        if (rates[toCurrency.value]) {
            setConvertedAmount(amount * rates[toCurrency.value]);
        } else {
            setConvertedAmount(null);
        }
    }
    const currencyOptions: CurrencyOption[] = currencies.map((cur) => ({
        value: cur,
        label: cur.toUpperCase(),
        country: countries[cur] ?? "",
    }));
    function SwapCurrency() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConvertedAmount(0);
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
                    <span className="tool-title">Currency Converter</span>
                </div>
            </div>
            <div className="tool-container">
                <div className="tool-info">Convert between currencies</div>
                <div className="currency-form">
                    <label>
                        Amount
                        <input
                            type="number"
                            min="0"
                            value={amount}
                            onChange={(e) => {
                                setAmount(Number(e.target.value));
                                setConvertedAmount(0);
                            }}
                            onBlur={(e) => {
                                const val = Number(e.target.value);
                                setAmount(Math.max(Number(e.target.min), val));
                            }}
                        />
                    </label>
                    <label className="from-label">
                        From
                        <span className="currency-name">{currenciesName[fromCurrency.value]}</span>
                        <Flag
                            className="currency-flag"
                            code={currencyToFlag[fromCurrency.value]}
                            fallback={<img className="currency-flag" src={euFlag} />}
                        />
                        <Select<CurrencyOption>
                            className="custom-select"
                            classNamePrefix="select"
                            options={currencyOptions}
                            value={fromCurrency}
                            filterOption={filterByCountry}
                            placeholder="Search by country or code..."
                            onChange={(option) => {
                                setFromCurrency(option!);
                                setConvertedAmount(0);
                            }}
                        />
                    </label>
                    <button onClick={SwapCurrency}>
                        <FontAwesomeIcon icon={faRightLeft} />
                    </button>
                    <label className="to-label">
                        To
                        <span className="currency-name">{currenciesName[toCurrency.value]}</span>
                        <Flag
                            className="currency-flag"
                            code={currencyToFlag[toCurrency.value]}
                            fallback={<img className="currency-flag" src={euFlag} />}
                        />
                        <Select<CurrencyOption>
                            className="custom-select"
                            classNamePrefix="select"
                            options={currencyOptions}
                            value={toCurrency}
                            filterOption={filterByCountry}
                            placeholder="Search by country or code..."
                            onChange={(option) => {
                                setToCurrency(option!);
                                setConvertedAmount(0);
                            }}
                        />
                    </label>
                </div>
                <button className="currency-convert-btn" onClick={ConvertCurrrency}>
                    Convert
                </button>
                <div className="currency-result">
                    <span>
                        {amount} {fromCurrency.label} =
                    </span>
                    <input
                        className="currency-output"
                        type="text"
                        readOnly
                        size={"10000000000000 CUR".length}
                        value={convertedAmount ? `${formatCurrency(convertedAmount)} ${toCurrency.label}` : ""}
                    />
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default CurrencyConverter;
