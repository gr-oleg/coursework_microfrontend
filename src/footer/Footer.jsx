import React from "react";
import './footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="footer-left">
                    <h3>Diploma<span>©2025</span></h3>
                    <p className="footer-desc">
                        Інтернет-магазин одягу та аксесуарів. 
                    </p>
                </div>
                <div className="footer-center">
                    <ul className="footer-links">
                        <li><a>Про нас </a></li>
                        <li><a>Каталог </a></li>
                        <li><a>Контакти </a></li>
                        <li><a>FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-right">
<div className="footer-social">
    <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{color: "#fff", textDecoration: "none"}}>
        Telegram
    </a>
    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{color: "#fff", textDecoration: "none"}}>
        Instagram
    </a>
    <a href="mailto:support@example.com" aria-label="Email" style={{color: "#fff", textDecoration: "none"}}>
        Email
    </a>
</div>
                    <p className="footer-contact">
                        <a href="mailto:support@example.com">support@example.com</a><br />
                        <span>+38 (099) 123-45-67</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}