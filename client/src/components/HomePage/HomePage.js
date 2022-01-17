import { useState, useEffect } from 'react';
import axios from 'axios';

import './HomePage.css'

import Header from './header/Header';
import PostedPost from './components/PostedPost/PostedPost';
import CreatePost from './components/CreatePost/CreatePost'
import ProfileSettings from './components/ProfileSettings/ProfileSettings';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState();
    const [profileName, setProfileName] = useState();
    const [visibleProfileSettings, setVisibleProfileSettings] = useState(false)
    const [search, setSearch] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [deletePosts, setDeletePosts] = useState()
    const [createPost, setCreatePost] = useState()

    const rootPosts = posts.filter(
        (post) => {
            if (posts.length !== 0) {
                let t1 = new Date()
                let ct = post.date
                return new Date(ct) < t1
            } else { return null }
        }
    )
    const loadProfile = async () => {
        const response = await axios('/api/auth/logged')
        const Data = await response.data

        const exp = new Date(Data.exp * 1000)
        const time = new Date()
        const outdated = Data.outdated

        if (time === exp || outdated) {
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
    const filterPosts = () => {

        const searchFilter = (post) => [post.content, post.author]
            .join('')
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1;
        setFilteredPosts(rootPosts.filter(searchFilter))
    }

    useEffect(() => {
        let isSubscribed = true;
        loadProfile()
        axios.get('/api/auth/post')
            .then(response => response.data.post)
            .then(Data => {
                if (isSubscribed) {
                    if (Data !== undefined) {
                        setPosts(Data)
                        setDeletePosts()
                        setCreatePost()
                        filterPosts()
                    } else { return }
                }
            })
        return () => { isSubscribed = false }
    },[search,deletePosts,createPost,profile])
    return (
        <div>

            <Header setSearch={setSearch} profileSettings={setVisibleProfileSettings} profile={profile} profileName={profileName} />
            <div>
                <ProfileSettings visibleProfileSettings={visibleProfileSettings} />
            </div>
            <CreatePost setCreatePost={setCreatePost} avatar={profile} />
            <div className="posts">
                {filteredPosts.map(rootPost => (
                    <PostedPost setDeletePosts={setDeletePosts} avatar={profile} key={rootPost._id} posts={rootPost} />
                ))}
            </div>

        </div>
    );
}

export default HomePage;