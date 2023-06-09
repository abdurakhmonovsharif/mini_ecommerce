import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Sider = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios({
            url: "http://localhost:8080/categories",
            method: "get"
        }).then(res => {
            setCategories(res.data)
        })
    }, [])
    function categoryChange(categoryId) {
        console.log(categoryId);
    }
    function showAllCategories() {
        console.log("all");
    }
    return (
        <div className='Sider'>
            <div className='categories'>
                <div className='all-category'>
                    <button onClick={showAllCategories}><span>All Category</span></button>
                </div>
                {
                    categories?.map(item => <button onClick={() => categoryChange(item.id)} className='categories-btn' key={item?.id}>
                        <span> {item.name}</span>
                    </button>)
                }
            </div>
        </div>
    );
}

export default Sider;
