import React from 'react';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import axios from 'axios';

import './ProfileSettings.css'

const ProfileSettings = ({ visibleProfileSettings }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    useEffect(() => {

    }, [])
    if (!visibleProfileSettings) {
        return (
            <div> </div>
        );
    } else {
        return (
            <div className="profile-settings-container">
                <div className="container-header">
                    <h2>Profile</h2>
                </div>
                <div className="container-body">
                    <form onSubmit={handleSubmit((e, data) => {
                        e.preventDefault();
                    })} >
                        <input
                            type="file"
                            multiple
                            accept="image/png, image/jpg"
                            {...register("image", {
                                required: true,
                            })}
                        />
                        <button>Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProfileSettings;