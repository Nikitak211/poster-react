import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './RegisterForm.css';

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
        const api = axios.create({
            baseUrl: 'http://localhost:7000'
        })
        await api.post('/api/auth/register', newUser)
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
                <input type="username"
                    {...register("username", {
                        required: "cannot be empty",
                        validate: value => !value.includes('@') || "cannot be email"

                    }
                    )}
                ></input>
            </div>
            <div>
                <label className={errors.email?.message || success || error}>Email</label>
                <small className={errors.email?.message}>{errors.email?.message}</small>
                <input type="email"
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        },
                        validate: value => value === watch("emailValidation") || "email is not matching"
                    }
                    )}
                ></input>
            </div>
            <div>
                <label className={errors.emailValidation?.message || success || error}>Email Verification</label>
                <small className={errors.emailValidation?.message}>{errors.email?.message}</small>
                <input type="email"
                    {...register("emailValidation", {
                        required: "email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        },
                        validate: value => value === watch('email') || "email is not matching"
                    }
                    )}
                ></input>
            </div>
            <div>
                <label className={errors.Password?.message || success}>Password</label>
                <small className={errors.Password?.message}>{errors.Password?.message}</small>
                <input type="Password"
                    {...register("Password", {
                        required: "password is required",
                        minLength: {
                            value: 8,
                            message: "minimum length is 8"
                        },
                        validate: value => value === watch('PasswordValidation') || "password doesnt match"
                    })}
                ></input>
            </div>
            <div>
                <label className={errors.PasswordValidation?.message || success}>Password Verification</label>
                <small className={errors.PasswordValidation?.message}>{errors.PasswordValidation?.message}</small>
                <input type="Password"
                    {...register("PasswordValidation", {
                        required: "password is required",
                        minLength: {
                            value: 8,
                            message: "minimum length is 8"
                        },
                        validate: value => value === watch('Password') || "password doesnt match"

                    })}
                ></input>
            </div>
            <button>Sign Up</button>
        </form>
    );

}

export default RegisterForm;