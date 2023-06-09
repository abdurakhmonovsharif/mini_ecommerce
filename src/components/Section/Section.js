import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './scss/Section.scss'
import xiomiText from '../../images/xioamibook12.4.png'
import xioamiBook from '../../images/xiamiBookS2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as WhiteHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as blackHeart } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';
const Section = () => {
    const [productsPartOne, setProductsPartOne] = useState([])
    const [videoGames, setVideoGames] = useState([])
    const [categories, setCategories] = useState([])
    const { userOrders, setUserOrders, userLikeOrders, setUserLikeOrders } = useOutletContext()
    useEffect(() => {
        getProductsPartOne()
        getcategories()
        videoGameProducts()
    }, [])
    function getProductsPartOne() {
        axios({
            url: "http://localhost:8080/products/menu_products",
            method: "get"
        }).then(res => {
            setProductsPartOne(res.data.data)
        })
    }
    function videoGameProducts() {
        axios({
            url: "http://localhost:8080/products/game_products",
            method: "get"
        }).then(res => {

            setVideoGames(res.data.data)
        })
    }
    function getcategories() {
        axios({
            url: "http://localhost:8080/categories",
            method: "get"
        }).then(res => {
            setCategories(res.data)
        })
    }
    function addToCard(item) {
        userOrders.push({ ...item, product_count: 1 })
        setUserOrders([...userOrders])
        localStorage.setItem("userOrders", JSON.stringify(userOrders))
        // axios({
        //     url: "http://localhost:8080/orders",
        //     method: "post",
        //     data: {
        //         user_id: localStorage.getItem("token"),
        //         count: 1,
        //         status: "pending"
        //     }
        // }).then(res => {
        //     let order_id = res.data.data;
        //     axios({
        //         url: "http://localhost:8080/orders_products",
        //         method: "post",
        //         data: {
        //             order_id,
        //             product_id: item.id
        //         }
        //     }).then(response => {
        //         console.log(response.data.data);
        //         getOrders()
        //     })
        // 
        // })
    }
    function addToLikesArray(item) {
        userLikeOrders.push({ ...item, product_count: 1 });
        setUserLikeOrders([...userLikeOrders]);
        localStorage.setItem("userLikeOrders", JSON.stringify(userLikeOrders))
    }
    function removeToLikesArray(item) {
        userLikeOrders.map((likes, index) => {
            if (item.id === likes.id) {
                userLikeOrders.splice(index, 1)
                setUserLikeOrders([...userLikeOrders])
            }
        })
        localStorage.setItem("userLikeOrders", JSON.stringify(userLikeOrders))
    }

    return (
        <div className='Section'>
            <div className='products'>
                {
                    productsPartOne.map((item, index) => <div className="product" key={item.id}>
                        <div className="imgbox" >
                            <img src={item.image_url} />
                        </div>
                        <div className="details">
                            <h2>{item.name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                            <div className="price">${item.price}</div>
                            <div className='d-flex align-items-center gap-4'>
                                <button className={userOrders.find(item2 => item2.id === item.id) ? 'disable-buy-btn' : 'buy-btn'} disabled={userOrders.find(item2 => item2.id === item.id)} onClick={() => addToCard(item)}>Add to Cart</button>
                                {userLikeOrders.find((likes) => likes.id == item.id) ? < FontAwesomeIcon size='xl' style={{ zIndex: 2 }} onClick={() => removeToLikesArray(item)} icon={blackHeart} /> : < FontAwesomeIcon style={{ zIndex: 2 }} size='xl' icon={WhiteHeart} onClick={() => addToLikesArray(item)} />}
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className='next-products'>
                <div className='next-product'>
                    <img src={xioamiBook} alt="image" className='image' />
                    <div className='rigth-box'>
                        <img src={xiomiText} alt="image" className='text' />
                        <button className="cta">
                            <span>Shop Now</span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='game-product'>
                <h1>Get ready for game day</h1>
                <div className='game-boxes'>
                    {
                        videoGames.map((item, index) => <div className="product" key={item.id}>
                            <div className="imgbox">
                                <img src={item.image_url} />
                            </div>
                            <div className="details">
                                <h2>{item.name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                <div className="price">${item.price}</div>
                                <div className='d-flex align-items-center gap-4'>
                                    <button className={userOrders.find(item2 => item2.id === item.id) ? 'disable-buy-btn' : 'buy-btn'} disabled={userOrders.find(item2 => item2.id === item.id)} onClick={() => addToCard(item)}>Add to Cart</button>
                                    {userLikeOrders.find((likes) => likes.id == item.id) ? < FontAwesomeIcon size='xl' style={{ zIndex: 2 }} onClick={() => removeToLikesArray(item)} icon={blackHeart} /> : < FontAwesomeIcon style={{ zIndex: 2 }} size='xl' icon={WhiteHeart} onClick={() => addToLikesArray(item)} />}
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div >
    );
}

export default Section;
