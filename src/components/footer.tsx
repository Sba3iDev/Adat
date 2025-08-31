import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../app.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} Adat. All rights reserved.</p>
                <div className="footer-links">
                    <a
                        href="https://www.linkedin.com/in/abdelmonim-sebai-el-fassi-98a0a4332/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&to=abdelmonimsebaielfassi@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="mailto:abdelmonimsebaielfassi@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
