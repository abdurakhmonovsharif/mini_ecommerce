import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Corusel from '../Corusel/Corusel';
import './scss/Home.scss'
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const [userOrders, setUserOrders] = useState([])
    const [userLikeOrders, setUserLikeOrders] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userOrders")) != null) {
            setUserOrders(JSON.parse(localStorage.getItem("userOrders")))
        }
    }, [])
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userLikeOrders")) != null) {
            setUserLikeOrders(JSON.parse(localStorage.getItem("userLikeOrders")))
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            let token = localStorage.getItem("token")
            axios({
                url: `http://localhost:8080/users/checkuser?token=${token}`,
                method: "get"
            }).then(response => {
                setIsLogged(response.data.data)
            })
        }
    }, [])
    useEffect(() => {
        setIsLogged(false)
    }, [localStorage.getItem("token")])
    return (
        <div className='Home'>
            <Header props={{ basketLength: userOrders.length }} />
            <Outlet context={{ userOrders, setUserOrders, setUserLikeOrders, userLikeOrders, isLogged, setIsLogged }} />
        </div>
    );
}

export default Home;
