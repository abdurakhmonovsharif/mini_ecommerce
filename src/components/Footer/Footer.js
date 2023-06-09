import React from 'react';
import './scss/Footer.scss'
import Logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <img src={Logo} alt="Logo" className="footer__logo" />
                        <span className="footer__text">
                            My Shopping
                        </span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-4">
                        <h5 className="footer__header">Important Info</h5>
                        <ul className="footer__list">
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-4">
                        <h5 className="footer__header">Follow Us</h5>
                        <ul className="footer__list footer__social">
                            <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faTelegram} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faFacebookMessenger} /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <p>&copy; 2023 Shopping Web Site. All rights reserved.</p>
            </div>
        </footer>

    );
}

export default Footer;
