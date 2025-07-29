import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Password from "./pages/password";
import FileConverter from "./pages/fileConverter";
import UnitConverter from "./pages/unitConverter";
import QrCode from "./pages/qrCode";
import CurrencyConverter from "./pages/currency";
import Calculator from "./pages/calculator";
import ColorPicker from "./pages/color";
import Numeral from "./pages/numearl";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password-generator" element={<Password />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/qr-code" element={<QrCode />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/numeral-system" element={<Numeral />} />
        </Routes>
    );
}

export default App;
