import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faHeart as WhiteHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as blackHeart } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext, useParams } from 'react-router-dom';
import './scss/Products.scss'
const Products = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [limit, setLimit] = useState(1)
    const { id } = useParams()
    const { userOrders, setUserOrders, userLikeOrders, setUserLikeOrders } = useOutletContext()
    useEffect(() => {
        // getProducts(limit)
        getcategories()
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            setIsLoading(true)
            setTimeout(() => {
                setLimit(limit + 1)
                setIsLoading(false)
            }, 1500)
        }
    };

    useEffect(() => {
        axios({
            url: "http://localhost:8080/products?page=" + limit,
            method: "get"
        }).then(res => {
            if (res.data.data.length < 8) {
                setIsLoading(false)
            }
            setProducts(prev => [...prev, ...res.data.data])
        })
    }, [limit]);

    function getcategories() {
        axios({
            url: "http://localhost:8080/categories",
            method: "get"
        }).then(res => {
            setCategories(res.data)
        })
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
    return (
        <div className='Products'>
            {
                id ? <div className='section'>
                    {
                        products.filter(filteredItems => filteredItems.category_id == id).map((item, index) => <div className="product" key={item.id}>
                            <div className="imgbox" >
                                <img src={item.image_url} />
                            </div>
                            <div className="details">
                                <h2>{item.name}<br /><span>{categories.map(item2 => item2.id === item.category_id && item2.name)}</span></h2>
                                <div className="price">${item.price}</div>
                                <div className='d-flex align-items-center gap-4'>
                                    <button className={userOrders.find(item2 => item2.id === item.id) ? 'disable-buy-btn' : 'buy-btn'} disabled={userOrders.find(item2 => item2.id === item.id)} onClick={() => addToCard(item)}>Add to Cart</button>
                                    {userLikeOrders.find((likes) => likes.id == item.id) ? < FontAwesomeIcon size='xl' style={{ zIndex: 2 }} onClick={() => removeToLikesArray(item)} icon={blackHeart} /> : < FontAwesomeIcon style={{ zIndex: 2 }} size='xl' icon={WhiteHeart} onClick={() => addToLikesArray(item)} />}
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div> : <div className='section'>
                    {
                        products.map((item, index) => <div className="product" key={item.id}>
                            <div className="imgbox" >
                                <img src={item.image_url} />
                            </div>
                            <div className="details">
                                <h2>{item.name}<br /><span>{categories.map(item2 => item2.id === item.category_id && item2.name)}</span></h2>
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


            }
            {
                isloading && <div className="loader"></div>
            }

        </div>
    );
}

export default Products;
