import React, { useEffect, useState } from 'react';
import './scss/Header.scss'
import Logo from './../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faHeart, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userImg from '../../images/user.png'
const Header = ({ props }) => {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState(false)
    const [basketLength, setBasketLength] = useState()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserInformations(token)
        }
    }, [])
    useEffect(() => {
        setBasketLength(props?.basketLength)
    }, [props?.basketLength])
    function getUserInformations(token) {
        axios({
            url: "http://localhost:8080/users/user/" + token,
            method: "get"
        }).then(res => {
            if (res.data.success) {
                setUser(res.data.data);
            }
        })
    }
    const [showLoginCard, setShowLoginCard] = useState(false);
    const navigate = useNavigate()
    const selectCounty = (e) => {
        localStorage.setItem("region", e.target.value)
    }
    window.onscroll = function () {
        var header = document.getElementById("header");
        if (window.pageYOffset > 50) {
            header.style.top = 0;
        } else {
            header.style.top = 50 + "px";
        }
    };
    const [counties, setCountries] = useState(["Andijan", "Bukhara", "Fergana", "Jizzakh", "Karakalpakstan", "Namangan", "Navoiy", "Samarqand", "Sirdaryo", "Surxondaryo", "Tashkent", "Xorazm"])
    return (
        <div className='header'>
            <div className='top-header'>
                <div className='my-county'>
                    <select onChange={selectCounty} defaultValue={localStorage.getItem("region")}>
                        {
                            counties.map(item => <option value={item} key={item}>{item}</option>)
                        }
                    </select>
                </div>
                <div className='phone-number'>
                    <h5>+998330434413</h5>
                </div>
            </div>
            <div className='bottom-header' id='header'>
                <div className='sections'>
                    <div className='left-section'>
                        <div className='logo' onClick={() => navigate("/")}>
                            <img src={Logo} alt="image_logo" />
                        </div>
                        <div className='navbar'>
                            <ul>
                                <li onClick={() => navigate("/")}>Home</li>
                                <li onClick={() => navigate("/categories")}>Category</li>
                                <li onClick={() => navigate("/products")}>Products</li>
                            </ul>
                        </div>
                    </div>
                    <div className='rigth-section'>
                        {
                            search && <form class="form">
                                <button>
                                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <input class="input" placeholder="search product" required="" type="text" />
                                <button class="reset" type="reset">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </form>
                        }
                        <FontAwesomeIcon icon={faSearch} className="icons" onClick={() => {
                            if (search) {
                                setSearch(false)
                            } else {
                                setSearch(true)
                            }
                        }} />
                        <FontAwesomeIcon icon={faHeart} className="icons" />
                        <FontAwesomeIcon icon={faUser} className="icons" onClick={() => navigate("/profile")} />
                        <div className='basket-icon' onClick={() => navigate("/basket")}>
                            <FontAwesomeIcon icon={faBasketShopping} className="icons" />
                            <span>{basketLength}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Header;
