import React, { useEffect, useState } from 'react';
import './scss/Admin.scss'
import Logo from './../../../images/logo.png'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Select from 'react-select';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const Admin = () => {
    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const [addProductModal, setAddProductModal] = useState(false)
    const [showOrders, setShowOrders] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [isProductEdit, setIsProductEdit] = useState(false)
    const [isProductEditProductImage, setIsProductEditProductImage] = useState('')
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [editItem, setEditItem] = useState({
        o_id: "",
        user_id: ""
    })
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategoryid, setSelectedCategoryid] = useState('')
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()
    useEffect(() => {
        getcategories()
        getProducts()
        getOrders()
        getUsers()
        return () => {
            if (refresh) {
                setRefresh(false)
            }
        }
    }, [addProductModal, addCategoryModal, refresh])

    function getcategories() {
        axios({
            url: "http://localhost:8080/categories",
            method: "get"
        }).then(res => {
            setCategories(res.data)
        })
    }
    function getProducts() {
        axios({
            url: "http://localhost:8080/products/admin/products",
            method: "get"
        }).then(res => {
            setProducts(res.data.data)
        })
    }
    function saveProduct(data) {
        if (isProductEdit) {
            if (data.file[0]) {
                console.log(data);
                const file = new FormData()
                file.append("image", data.file[0])
                axios({
                    url: "http://localhost:8080/file",
                    method: "post",
                    data: file
                }).then(res => {
                    const ImageId = res.data.data;
                    axios({
                        url: "http://localhost:8080/products",
                        method: "put",
                        data: {
                            name: data.name,
                            price: data.price,
                            category_id: selectedCategoryid,
                            image_url: ImageId
                        }
                    }).then(res => {
                        reset({
                            name: "",
                            price: "",
                            product_image: null
                        })
                        setSelectedCategoryid("")
                        setIsProductEdit(false)
                        setAddProductModal(false)
                    })
                })
            } else {
                console.log(data);
                axios({
                    url: "http://localhost:8080/products",
                    method: "put",
                    data: {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        category_id: selectedCategoryid,
                        image_url: data.image_url
                    }
                }).then(res => {
                    reset({
                        name: "",
                        price: "",
                        product_image: null
                    })
                    setSelectedCategoryid("")
                    setIsProductEdit(false)

                    setAddProductModal(false)
                })
            }

        } else {
            const file = new FormData()
            file.append("image", data.file[0])
            axios({
                url: "http://localhost:8080/file",
                method: "post",
                data: file
            }).then(res => {
                const ImageId = res.data.data;
                axios({
                    url: "http://localhost:8080/products",
                    method: "post",
                    data: {
                        name: data.name,
                        price: data.price,
                        category_id: selectedCategoryid,
                        image_url: ImageId
                    }
                }).then(res => {
                    reset({
                        name: "",
                        price: "",
                        product_image: null
                    })
                    setSelectedCategoryid("")
                    setAddProductModal(false)
                })
            })
        }

    }
    function deleteProduct(id) {
        axios({
            url: "http://localhost:8080/products/" + id,
            method: "delete"
        }).then(res => {
            getProducts()
        })
    }
    function updateProduct(item) {
        setSelectedCategoryid(item.category_id)
        reset(item)
        setIsProductEditProductImage(item.image_url)
        setIsProductEdit(true)
        setAddProductModal(true)
    }
    function saveCategory(data) {
        const file = new FormData()
        file.append("image", data.category_image[0])
        axios({
            url: "http://localhost:8080/file",
            method: "post",
            data: file
        }).then(res => {
            const ImageId = res.data.data;
            console.log(ImageId);
            // axios({
            //     url: "http://localhost:8080/categories",
            //     method: "post",
            //     data: { name: data.category_name, image_url: ImageId }
            // }).then(res => {
            //     getcategories()
            //     setAddCategoryModal(false)
            //     reset()
            // })
        })
    }
    function getOrders() {
        axios({
            url: "http://localhost:8080/orders/admin/orders",
            method: "get",
        }).then(response => {
            setOrders(response.data.data)
            response.data.data.map(item => {


            })
        })
    }
    function drop(e, param) {
        e.preventDefault();
        axios({
            url: `http://localhost:8080/orders/${editItem.o_id}`,
            method: "put",
            data: { status: param }
        }).then(res => {
            getOrders()
            setRefresh(true)
        })
    }
    function draggOver(e) {
        e.preventDefault()

    }
    function getUsers() {
        axios({
            url: "http://localhost:8080/users/getUsers",
            method: "get",
        }).then(res => {
            setUsers(res.data.data)
        })
    }
    return (
        <div className='Admin'>
            <div className='sider'>
                <div className='logo' onClick={() => navigate("/")}>
                    <img src={Logo} alt="image" />
                </div>
                <div className='categories'>
                    <button className="cta" onClick={() => setAddProductModal(true)}>
                        <span className="hover-underline-animation">Add Product</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                    <button className="cta" onClick={() => setAddCategoryModal(true)}>
                        <span className="hover-underline-animation">Categories</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                    <button className="cta" onClick={() => setShowOrders(true)}>
                        <span className="hover-underline-animation">Orders</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                    <button className="cta" onClick={() => setShowUser(true)}>
                        <span className="hover-underline-animation">Users</span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <Rodal visible={addProductModal} onClose={() => setAddProductModal(false)} height={430}>
                <form className='py-4 d-flex gap-3 flex-column save-product' onSubmit={handleSubmit(saveProduct)}>
                    <select value={selectedCategoryid} className='form-select' onChange={(e) => setSelectedCategoryid(e.target.value)}>
                        {categories.map(item => {
                            if (isProductEdit) {
                                if (item.id === selectedCategoryid) {
                                    return <option value={item.id} key={item.id}>{item.name}</option>
                                }
                            } else {
                                return <option value={item.id} key={item.id}>{item.name}</option>
                            }
                        })}
                    </select>
                    <input {...register("name")} type="text" placeholder='Product name' className='form-control' />
                    <input type="text" {...register("price")} placeholder='Product price' className='form-control' />
                    {
                        isProductEdit && <img src={isProductEditProductImage} alt="image" width={50} />
                    }
                    <input type="file" {...register("file")} accept='.png, .jpg' className='form-control' />
                    <button>save</button>
                </form>
            </Rodal>
            <Rodal visible={addCategoryModal} onClose={() => setAddCategoryModal(false)} height={350}>
                <form className='py-4 d-flex gap-3 flex-column save-product' onSubmit={handleSubmit(saveCategory)}>
                    <input {...register("category_name")} type="text" placeholder='Category name' className='form-control' />
                    <input {...register("category_image")} type="file" className='form-control' />
                    <button>save</button>
                </form>
            </Rodal>
            {
                showOrders ? "" : <table className='products table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>name</th>
                            <th>category</th>
                            <th>price</th>
                            <th>image</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(item => <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                {
                                    categories.map(item2 => {
                                        if (item2.id === item.category_id) {
                                            return (<td key={item.id}>{item2.name}</td>)
                                        }
                                    })
                                }
                                <td>{item.price}</td>
                                <td>
                                    <img src={item.image_url} alt="iamge" width={30} />
                                </td>
                                <td className='btn-group'>
                                    <button className='btn btn-danger' onClick={() => deleteProduct(item.id)}>x</button>
                                    <button className='btn btn-info' onClick={() => updateProduct(item)}>edit</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }

            {
                showOrders && <div className='orders'>
                    <div className='box' onDrop={(e) => drop(e, "pending")}
                        onDragOver={draggOver}>
                        <span>Pending</span>
                        {
                            orders.filter(item2 => item2.status == "pending").map(item => <div draggable className="product" key={item.id}
                                onDrag={() => setEditItem({
                                    o_id: item.order_id,
                                    user_id: item.user_id
                                })}
                            >
                                <div className="imgbox" >
                                    <img src={item.product_image_url} />

                                </div>
                                <div className="details">
                                    <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                    <span className='price'>{item.product_count}x</span>
                                    <span className='email'>user: {users.map(item3 => {
                                        if (item3.id == item.user_id) {
                                            return item3.email
                                        }
                                    }
                                    )}</span>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className='box' onDrop={(e) => drop(e, "inprogess")}
                        onDragOver={draggOver}>
                        <span>Inprogess</span>
                        {
                            orders.filter(item2 => item2.status == "inprogess").map(item => <div
                                draggable
                                onDrag={() => setEditItem({
                                    o_id: item.order_id,
                                    user_id: item.user_id
                                })}
                                className="product" key={item.id}>
                                <div className="imgbox" >
                                    <img src={item.product_image_url} />
                                </div>
                                <div className="details">
                                    <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                    <span className='price'>{item.product_count}x</span>
                                    <span className='email'>user: {users.map(item3 => {
                                        if (item3.id == item.user_id) {
                                            return item3.email
                                        }
                                    }
                                    )}</span>
                                </div>
                            </div>)
                        }

                    </div>
                    <div className='box' onDrop={(e) => drop(e, "competed")}
                        onDragOver={draggOver}>
                        <span>Competed</span>
                        {
                            orders.filter(item2 => item2.status == "competed").map(item => <div
                                draggable

                                onDrag={() => setEditItem({
                                    o_id: item.order_id,
                                    user_id: item.user_id
                                })}
                                className="product" key={item.id}>
                                <div className="imgbox" >
                                    <img src={item.product_image_url} />
                                </div>
                                <div className="details">
                                    <h2>{item.product_name}<br /><span>{categories.map(item2 => item2.id == item.category_id && item2.name)}</span></h2>
                                    <span className='price'>{item.product_count}x</span>
                                    <span className='email'>user: {users.map(item3 => {
                                        if (item3.id == item.user_id) {
                                            return item3.email
                                        }
                                    }
                                    )}</span>
                                </div>
                            </div>)
                        }

                    </div>

                </div>
            }
            {
                showUser && <table className='table'>
                    <thead>
                        <tr>
                            <th>firtName</th>
                            <th>lastName</th>
                            <th>email</th>
                            <th>password</th>
                            <th>role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(item => <tr key={item.id}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.role}</td>
                                <td className='d-flex'>
                                    <button className='btn btn-info'>edit</button>
                                    <button className='btn btn-danger'>x</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Admin;
