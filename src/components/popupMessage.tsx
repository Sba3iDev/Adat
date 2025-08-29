import { useState, useEffect } from "react";
import "../app.css";

interface PopupMessageProps {
    message: string;
    trigger: number;
    duration?: number;
}

function PopupMessage({ message, trigger, duration = 3000 }: PopupMessageProps) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (trigger) {
            setShow(false);
            const startTimer = setTimeout(() => setShow(true), 10);
            const hideTimer = setTimeout(() => setShow(false), duration);
            return () => {
                clearTimeout(startTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [message, trigger, duration]);
    return (
        <div className={`popup ${show ? "show" : ""}`}>
            <p>{message}</p>
        </div>
    );
}

export default PopupMessage;
