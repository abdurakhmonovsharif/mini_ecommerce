import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './scss/Basket.scss'
import Header from '../../Header/Header'
import Rodal from 'rodal';
import emptyBasket from '../../../images/empty-cart.png'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
const Basket = () => {
    const [totalsum, setTotalSum] = useState(0)
    const navigate = useNavigate()
    const {
        userOrders, setUserOrders, isLogged
    } = useOutletContext()
    const [modal, setModal] = useState(false)
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userOrders")) != null) {
            const products = JSON.parse(localStorage.getItem("userOrders"));
            setUserOrders(products)
        }
    }, [])
    useEffect(() => {
        let a = 0
        userOrders.map(item => {
            a += item.product_count * item.price
        }
        )
        setTotalSum(a)
        localStorage.setItem("userOrders", JSON.stringify(userOrders))
    }, [userOrders])
    function getOrders() {
        let user_id = localStorage.getItem("token")
        axios({
            url: `http://localhost:8080/orders?user_id=${user_id}`,
            method: "get",
        }).then(res => {

        })
    }
    const handleClick = (order_id, type) => {
        setUserOrders(
            userOrders.map(product => {
                if (product.id === order_id) {
                    return {
                        ...product,
                        product_count: type === 'plus' ? Number(product.product_count) + 1 : Number(product.product_count) > 1 ? Number(product.product_count) - 1 : Number(product.product_count)
                    };
                }
                return product;
            })
        );
    };
    function deleteProduct(index) {
        userOrders.splice(index, 1);
        setUserOrders([...userOrders])
    }
    function addToBasket() {
        if (isLogged) {
            axios({
                url: "http://localhost:8080/orders",
                method: "post",
                data: {
                    user_id: localStorage.getItem("token"),
                    status: "pending"
                }
            }).then(res => {
                let order_id = res.data.data;
                console.log(res.data.data);
                userOrders.map(item => {
                    axios({
                        url: "http://localhost:8080/orders_products",
                        method: "post",
                        data: {
                            order_id,
                            product_id: item.id,
                            count: item.product_count
                        }
                    }).then(response => {
                        userOrders.splice(0, userOrders.length);
                        setUserOrders([...userOrders])
                    })
                })

            })
        }

    }
    return (
        <div className='wrapper'>
            <Rodal visible={modal} onClose={() => setModal(false)} height={650} width={500}>
                <h2 className='text-monospace'>Your Bill</h2>
                <div className='bill'>
                    <div className='my-table'>
                        <div className='table-head'>
                            <span className='name'>Name</span>
                            <span className='price'>Price</span>
                            <span className='count'>Quantity</span>
                            <span className='total'>Total</span>
                        </div>
                        <div className='table-body'>
                            {
                                userOrders.map(item => <div className='table-tr'>
                                    <span className='product_name'>{item.name}</span>
                                    <span className='product_price'>${item.price}</span>
                                    <span className='product_count'>{item.product_count}x</span>
                                    <span className='product_price'>${Number(item.product_count) * Number(item.price)}</span>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className='bill-footer'>
                        {
                            !isLogged && <div className='user-not-found'>
                                <span>Please login to purchase products</span>
                                <button onClick={() => navigate("/login")}>Log in</button>
                            </div>
                        }
                        <button className='buy-btn' onClick={() => addToBasket()}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Square Cash" role="img" viewBox="0 0 512 512" id="IconChangeColor" height="30" width="30"><rect width="512" height="512" rx="15%" fill="#00d632"></rect><path d="m339.5 190.1c4 4 10.7 4 14.4 0l20-20.8c4.2-4 4-11.2-.5-15.6-15.7-13.7-34.1-24.2-53.9-30.8l6.3-30.5c1.4-6.7-3.6-12.9-10.3-12.9h-38.8c-5 .1-9.3 3.6-10.3 8.5l-5.6 27.1c-51.6 2.6-95.4 28.9-95.4 82.6 0 46.5 36.2 66.4 74.4 80.2 36.2 13.8 55.3 18.9 55.3 38.3 0 20-19.1 31.7-47.3 31.7-25.7 0-52.6-8.6-73.4-29.5-4.1-4.1-10.7-4.1-14.7 0l-21.5 21.6c-4.2 4.3-4.2 11.1 0 15.4 16.8 16.6 38.2 28.6 62.5 35.3l-5.9 28.6c-1.4 6.7 3.5 12.8 10.2 12.9l38.9.3c5.1 0 9.4-3.5 10.4-8.5l5.6-27.2c62.1-4.2 99.9-38.4 99.9-88.3 0-46-37.7-65.4-83.4-81.2-26.1-9.7-48.7-16.4-48.7-36.3 0-19.4 21.1-27.1 42.2-27.1 26.9 0 52.8 11.1 69.7 26.4z" fill="#fff" id="mainIconPathAttribute"></path></svg>
                            <span>Buy</span>
                        </button>
                    </div>
                </div>
            </Rodal>
            {
                userOrders.length == 0 ? <div className='emptyBasket'>
                    <img src={emptyBasket} alt="image" />
                    <h1>Your cart is empty</h1>
                    <h1>Go back and buy the item you like</h1>
                    <Link to='/'>
                        <button> Go to back</button></Link>
                </div> :
                    <div className='Basket'>
                        <div className='user_orders'>
                            {
                                userOrders?.map((item, index) => <div key={item.id} className='my-card col-6'>
                                    <div className='image'>
                                        <img src={item.image_url} alt="image" />
                                    </div>
                                    <div className='title-price'>
                                        <h5>{item.name}</h5>
                                        <h5>${item.price}</h5>
                                    </div>
                                    <div className='counters'>
                                        <button className='btn' disabled={item.product_count == 1} onClick={() => handleClick(item.id, 'minus')}>-</button>
                                        <h5>{item.product_count}</h5>
                                        <button className='btn' onClick={() => handleClick(item.id, 'plus')}>+</button>
                                        <button className='del-btn' onClick={() => deleteProduct(index)}>x</button>
                                    </div>
                                    <span className='total-price'>Total price: ${Number(item.product_count) * Number(item.price)}</span>
                                </div>)
                            }
                        </div>
                        <div className='footer'>
                            <h2> Total sum: $ {totalsum}</h2>
                            <button onClick={() => setModal(true)} className="button "> Show Bill
                            </button>
                        </div>
                    </div>
            }

        </div>

    );
}

export default Basket;
