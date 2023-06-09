import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Register.scss'
const Register = () => {
    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()
    const [passwordRepeadError, setPasswordRepeadError] = useState(false)
    function registerUser(data) {
        if (data.password === data.RepeadPassword) {
            axios({
                url: "http://localhost:8080/users",
                method: "post",
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password
                }
            }).then(res => {
                if (res.data.success) {
                    navigate("/login")
                } else {
                    // error
                }
            })
        } else {
            setPasswordRepeadError(true)
        }
    }
    return (
        <div className='Register'>
            <form onSubmit={handleSubmit(registerUser)} className='form card p-2 text-center'>
                <h4 className='text-monospace'>Register</h4>
                <input {...register("firstName")} placeholder="FirstName" type="text" className="form-control" required />
                <input {...register("lastName")} placeholder="LastName" type="text" className="form-control" required />
                <input {...register("email")} placeholder="Email" type="text" className="form-control" required />
                <input {...register("password")} placeholder="Password" type="text" className="form-control" required />
                <input {...register("RepeadPassword")} placeholder="Repeat password" type="text" className="form-control" required />
                <button>Register</button>
                <div className='d-flex gap-2'>
                    <h5 class="text-monospace">Have an account?</h5>
                    <Link to={"/register"}>
                        <span>Login</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
