import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import './scss/Login.scss'
const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const [loginError, setLoginError] = useState(false)
    function loginUser(data) {
        axios({
            url: `http://localhost:8080/users?email=${data.email}&&password=${data.password}`,
            method: "get"
        }).then(res => {
            if (res.data.success && res.data.data != null) {
                localStorage.setItem("token", res.data.data)
                navigate("/")
            } else {
                setLoginError(true)
            }
        })
    }
    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(loginUser)} className='form card p-2 text-center'>
                <h4 className='text-monospace'>Login</h4>
                <input {...register("email")} placeholder="Email" type="text" className="form-control" required="" />
                <input {...register("password")} placeholder="Password" type="text" className="form-control" required="" />
                <button>Login</button>
                <div className='d-flex gap-2'>
                    <h5 className="text-monospace">Don't have an account?</h5>
                    <Link to={"/register"}>
                        <span> Register</span>
                    </Link>
                </div>
                {loginError && <span className='text-monospace text-danger'>Email or Password error</span>}
            </form>
        </div>
    );
}

export default Login;
