import React, { useEffect, useState } from 'react';
import './scss/Profile.scss'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRefresh, faSignOut } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
    const [userModal, setUserModal] = useState(false)
    const [myOrders, setMyOrders] = useState([])
    const [showMyOrders, setShowMyOrders] = useState(false)
    const [categories, setCategories] = useState([])
    const { isLogged, setIsLogged } = useOutletContext()
    const [passwordRepeadError, setPasswordRepeadError] = useState(false)
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            getcategories()
        }
    }, [isLogged])
    function getOrders() {
        let user_id = localStorage.getItem("token")
        axios({
            url: "http://localhost:8080/orders?user_id=" + user_id,
            method: "get",
        }).then(response => {
            setMyOrders(response.data.data);
            console.log(response.data.data);
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
    function editUser(data) {
        console.log(data);
        if (data.password === data.repeadPassword) {
            axios({
                url: "http://localhost:8080/users?id=" + data.id,
                method: "put",
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password
                }
            }).then(res => {
                console.log(res.data.data);
            })
        } else {
            setPasswordRepeadError(true)
        }

    }
    useEffect(() => {
        if (isLogged) {
            let token = localStorage.getItem("token")
            axios({
                url: "http://localhost:8080/users/user/" + token,
                method: "get"
            }).then(res => {
                res.data.data.map(item => {
                    reset(item)
                    setUser(item)
                })
                if (res.data.success) {
                    setUserModal(false)
                }
            })
        }
    }, [isLogged])
    function logOut() {
        localStorage.clear()
        setIsLogged(false)
    }
    return (
        <div className='Profile'>
            {isLogged ? <div className='wrapper'>
                <div className='left-sider'>
                    <div className='d-flex flex-column gap-2 text-center user'>
                        <FontAwesomeIcon icon={faUser} size='3x' />
                        <span>{user.firstName}</span>
                        <span>{user.email}</span>
                        <button onClick={logOut} className='btn btn-dark'> log out <FontAwesomeIcon icon={faSignOut} /> </button>
                    </div>
                    <button className="cta" onClick={() => setUserModal(true)}>
                        <span className="hover-underline-animation">Edit Profile</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                    <button className="cta" onClick={() => {
                        getOrders()
                        setShowMyOrders(true)
                    }}>
                        <span className="hover-underline-animation">My Orders</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                </div>
                <Rodal visible={userModal} onClose={() => setUserModal(false)} height={320} >
                    <form className='d-flex p-3 gap-2 flex-column' onSubmit={handleSubmit(editUser)}>
                        <input defaultValue={user.firstName} {...register("firstName")} type="text" className='form-control' placeholder='firtName' required />
                        <input defaultValue={user.lastName} {...register("lastName")} type="text" className='form-control' placeholder='lastName' required />
                        <input defaultValue={user.email} {...register("email")} type="email" className='form-control' placeholder='Email' required />
                        <input defaultValue={user.password} {...register("password")} type="text" className='form-control' placeholder='Password' required />
                        <input type="text" className='form-control' {...register("repeadPassword")} placeholder='Repead Password' required />
                        <button className='btn btn-dark '>Edit Profile</button>
                    </form>
                </Rodal>
                {
                    showMyOrders && <div className='orders'>
                        <div className='box'>
                            <span>Pending</span>
                            {
                                myOrders.length > 1 && myOrders.filter(item2 => item2.status == "pending").map(item => <div draggable className="product" key={item.id}>
                                    <div className="imgbox" >
                                        <img src={item.product_image_url} />
                                    </div>
                                    <div className="details">
                                        <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                        <span className='price'>{item.product_count}x</span>
                                    </div>
                                </div>)
                            }

                        </div>
                        <div className='box'>
                            <span>Inprogess</span>
                            {
                                myOrders.length > 1 && myOrders.filter(item2 => item2.status == "inprogess").map(item => <div className="product" key={item.id}>
                                    <div className="imgbox" >
                                        <img src={item.product_image_url} />
                                    </div>
                                    <div className="details">
                                        <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                    </div>
                                </div>)
                            }

                        </div>
                        <div className='box'>
                            <span>Competed</span>
                            {
                                myOrders.length > 1 && myOrders.filter(item2 => item2.status == "competed").map(item => <div className="product" key={item.id}>
                                    <div className="imgbox" >
                                        <img src={item.product_image_url} />
                                    </div>
                                    <div className="details">
                                        <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                    </div>
                                </div>)
                            }

                        </div>
                        <FontAwesomeIcon icon={faRefresh} className="refresh-icon" onClick={() => getOrders()} />
                    </div>
                }
            </div> : <div className='user-not-found'>
                <div className="loader"></div>
                <span>Sign in to see your saved items</span>
                <button onClick={() => navigate("/login")}> Sign in</button>
            </div>
            }
        </div>
    );
}

export default Profile;
