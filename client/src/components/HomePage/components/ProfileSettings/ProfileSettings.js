import React from 'react';
import { useEffect, useState } from 'react'

import axios from 'axios';

import PostedPost from '../PostedPost/PostedPost';
import CreatePost from '../CreatePost/CreatePost'
import Header from '../../header/Header';

import './ProfileSettings.css'

const ProfileSettings = () => {
    const [verify, setVerify] = useState()
    const [deletePosts, setDeletePosts] = useState()
    const [createPost, setCreatePost] = useState()
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState()
    const [profile, setProfile] = useState();
    const [profileName, setProfileName] = useState();
    const [user_id, setUserId] = useState()
    const [pending , setPending] = useState([])

    const logout = async () => {
        const response = await axios.post('/api/auth/logout')
        const json = await response.data

        if (json.success) {
            window.location.reload()
            alert(json.message)
        }
        if (json.error) alert(json.message)
    }

    const loadProfile = async () => {
        const response = await axios('/api/auth/logged')
        const Data = await response.data
        const exp = new Date(Data.exp * 1000)
        const time = new Date()
        const outdated = Data.outdated

        if (time === exp || outdated) {
            logout()
        }
        if (Data !== undefined) {
            setVerify(Data._id)
            setProfile(Data.avatar);
            setProfileName(Data.author)
            if(Data.pending !== undefined){
                setPending(Data.pending)
            } 
        } else { return }

    }

    useEffect(() => {
        let isSubscribed = true;
        loadProfile()
        if (verify !== undefined) {
            axios.get(`/api/auth/post/${verify}`)
                .then(response => response.data.post)
                .then(Data => {
                    if (isSubscribed) {
                        setPosts(Data.reverse())
                        setDeletePosts()
                        setCreatePost()
                    }
                })
        } 
        return () => { isSubscribed = false }
    }, [search, deletePosts, createPost, profile])

    return (
        <div className="profile-settings-container">
            <Header user_id={verify} pending={pending} setSearch={setSearch} />
            <div className="container-header">
                <div className="profile-main-avatar">
                    <img width={100} src={profile} alt={profileName}></img>
                </div>

                <h2>{profileName}</h2>
            </div>
            <div className="container-body">
                <CreatePost setCreatePost={setCreatePost} avatar={profile} />
                <div className="posts">
                    {posts.map(rootPost => (
                        <PostedPost user_id={verify} setDeletePosts={setDeletePosts} avatar={profile} key={rootPost._id} posts={rootPost} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;