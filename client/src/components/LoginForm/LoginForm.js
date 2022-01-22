import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './LoginForm.css';
import Input from '../Input';

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

        await axios.post('/api/auth/login', user)
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
                <Input type={"email"} callback={"email"} required={"email is required"} value={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i} func={register} message="invalid email address" />
            </div>
            <div>
                <label className={errors.Password?.message || error || success}>Password</label>
                <small className={errors.Password?.message || error}>{errors.Password?.message || error}</small>
                <Input type={"Password"} callback={"Password"} required={"password is required"} value={8} func={register} message="minimum length is 8" />
            </div>
            <button type="submit">Login</button>
            <ul className="btn btn-ul">
                <li className="btn btn-li">Forgot password</li>
                <li className="btn btn-li">Sign in with Google</li>
            </ul>
        </form>
    );
}

export default LoginForm;
