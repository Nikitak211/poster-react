import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './RegisterForm.css';
import Input from '../Input';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const createUser = async (username, password, email) => {
        const newUser = {
            author: username,
            password: password,
            email: email,
            date: new Date()
        }

        await axios.post('/api/auth/register', newUser)
            .then(response => {
                let data = response.data

                if (data.success) {
                    setSuccess(data.message)
                    return window.location = "/";
                }
                if (data.error) return setError(data.message)
            })
            .catch(err => {
                setError(err.data.message)
            })
    }

    return (
        <form className="FormRegister" action="" onSubmit={handleSubmit((data) => {
            createUser(data.username, data.Password, data.email)
        })}>
            <div>
                <label className={errors.username?.message || success}>Username</label>
                <small className={errors.username?.message}>{errors.username?.message}</small>
                <Input type={"username"} callback={"username"} required={"cannot be empty"} func={register} valid={value => !value.includes('@') || "cannot be email"} />
            </div>
            <div>
                <label className={errors.email?.message || success || error}>Email</label>
                <small className={errors.email?.message}>{errors.email?.message}</small>
                <Input type={"email"} callback={"email"} required={"email is required"} message="invalid email address" value={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i} func={register} valid={value => value === watch("emailValidation") || "email is not matching"} />
            </div>
            <div>
                <label className={errors.emailValidation?.message || success || error}>Email Verification</label>
                <small className={errors.emailValidation?.message}>{errors.email?.message}</small>
                <Input type={"email"} callback={"emailValidation"} required={"email is required"} message="invalid email address" value={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i} func={register} valid={value => value === watch("email") || "email is not matching"} />
            </div>
            <div>
                <label className={errors.Password?.message || success}>Password</label>
                <small className={errors.Password?.message}>{errors.Password?.message}</small>
                <Input type={"Password"} callback={"Password"} required={"password is required"} message="minimum length is 8" value={8} func={register} valid={value => value === watch('PasswordValidation') || "password doesnt match"} />
            </div>
            <div>
                <label className={errors.PasswordValidation?.message || success}>Password Verification</label>
                <small className={errors.PasswordValidation?.message}>{errors.PasswordValidation?.message}</small>
                <Input type={"Password"} callback={"PasswordValidation"} required={"password is required"} message="minimum length is 8" value={8} func={register} valid={value => value === watch('Password') || "password doesnt match"} />
            </div>
            <button>Sign Up</button>
        </form>
    );
}

export default RegisterForm;