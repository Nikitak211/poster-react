import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './header/Header';
import PostedPost from './components/PostedPost/PostedPost';
import CreatePost from './components/CreatePost/CreatePost'

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState();
    const [profileName, setProfileName] = useState();

    const rootPosts = posts.filter(
        (post) => {
            if (posts.length !== 0) {
                let t1 = new Date()
                let ct = post.date
                return new Date(ct) < t1
            }
        }
    )
    const loadProfile = async () => {
        const response = await axios('/api/auth/logged')
        const Data = await response.data

        const exp = new Date(Data.exp * 1000)
        const time = new Date()
        const outdated = Data.outdated

        if (time == exp || outdated) {
            async function logout() {
                const response = await axios.post('/api/auth/logout')
                const json = await response.data

                if (json.success) {
                    window.location.reload()
                    alert(json.message)
                }
                if (json.error) alert(json.message)
            }
            logout()
        }
        setProfile(Data.avatar);
        setProfileName(Data.author)
    }

    useEffect(() => {
        loadProfile()
        axios.get('/api/auth/post')
            .then(response => response.data.post)
            .then(Data => {
                if (Data !== undefined) {
                    setPosts(Data)
                }
            })
    }, [])

    return (
        <div>
            <Header profile={profile} profileName={profileName} />
            <CreatePost />
            <div>
                {rootPosts.map(rootPost => (
                    <PostedPost key={rootPost._id} posts={rootPost} />
                ))}
            </div>

        </div>
    );
}

export default HomePage;