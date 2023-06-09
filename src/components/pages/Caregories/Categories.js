import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import './scss/Categories.scss'
const Categories = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getcategories()
    }, [])
    function getcategories() {
        axios({
            url: "http://localhost:8080/categories",
            method: "get"
        }).then(res => {
            setCategories(res.data)
        })
    }
    return (
        <div className='Categories'>
            <div className='section'>
                <div className='categories-cards'>
                    {
                        categories.map(item => <div key={item.id} className="my-card" onClick={() => navigate(`/products/${item.id}`)}>
                            <div className="card-image"><img src={item.image_url} alt="image" /></div>
                            <div className="name"> {item.name} </div>
                        </div>)
                    }
                </div>
            </div>
        </div >
    );
}

export default Categories;
