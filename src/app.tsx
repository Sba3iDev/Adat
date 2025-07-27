import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Password from "./pages/password";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password-generator" element={<Password />} />
        </Routes>
    );
}

export default App;
