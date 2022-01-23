import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './LoginForm.css';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const LogUser = async (email, password) => {
        const user = {
            password: password,
            email: email
        }
        const api = axios.create({
            baseUrl: 'http://localhost:7000'
        })
        await api.post('/api/auth/login', user)
            .then(response => {
                let data = response.data
                if (data.success) {
                    setSuccess(data.isAuth)
                    return window.location = "/";
                }
                if (data.error) return setError(data.message)
            })
            .catch(err => {
                setError(err.data.message)
            })
    }
    return (
        <form className="LoginForm" action="" onSubmit={handleSubmit((data) => {
            LogUser(data.email, data.Password)
        })}>
            <div>
                <label className={errors.email?.message || error || success}>Email</label>
                <small className={errors.email?.message || error}>{errors.email?.message || error}</small>
                <input type="email" {...register("email", {
                    required: "email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                }
                )}></input>
            </div>
            <div>
                <label className={errors.Password?.message || error || success}>Password</label>
                <small className={errors.Password?.message || error}>{errors.Password?.message || error}</small>
                <input type="Password" {...register("Password", {
                    required: "password is required",
                    minLength: {
                        value: 8,
                        message: "minimum length is 8"
                    }
                })}></input>
            </div>
            <button>Login</button>
            <ul className="btn btn-ul">
                <li className="btn btn-li">Forgot password</li>
                <li className="btn btn-li">Sign in with Google</li>
            </ul>
        </form>
    );
}

export default LoginForm;
