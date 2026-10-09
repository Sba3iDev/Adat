import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Password from "./pages/password";
import UnitConverter from "./pages/unitConverter";
import QrCode from "./pages/qrCode";
import CurrencyConverter from "./pages/currency";
import Numeral from "./pages/numearl";
import ArabicTextConverter from "./pages/arabicTextConverter";
import CodeFormatter from "./pages/codeFormatter";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password-generator" element={<Password />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/qr-code" element={<QrCode />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/numeral-system" element={<Numeral />} />
            <Route path="/arabic-text-converter" element={<ArabicTextConverter />} />
            <Route path="/code-formatter" element={<CodeFormatter />} />
        </Routes>
    );
}

export default App;
