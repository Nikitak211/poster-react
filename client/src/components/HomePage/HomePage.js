import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './HomePage.css'

import Header from './header/Header';
import PostedPost from './components/PostedPost/PostedPost';
import CreatePost from './components/CreatePost/CreatePost'
import ChatFunc from '../Chats/ChatFunc';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState();
    const [profileName, setProfileName] = useState();
    const [search, setSearch] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [deletePosts, setDeletePosts] = useState()
    const [createPost, setCreatePost] = useState()
    const [user_id, setUserId] = useState()
    const [pending, setPending] = useState([])
    const [listOfFriends, setListOfFriends] = useState([])

    const rootPosts = posts.filter(
        (post) => {

            if (post.length !== 0) {
                let t1 = new Date()
                let ct = post.date
                return new Date(ct) < t1
            } else { return null }
        }
    )

    const logout = async () => {
        const response = await axios.post('/api/auth/logout')
        const json = await response.data

        if (json.success) {
            window.location.reload()
            alert(json.message)
        }
        if (json.error) alert(json.message)
    }

    const loadProfile = useCallback(async () => {

        const response = await axios.get('/api/auth/logged')
        const Data = await response.data
        const exp = new Date(Data.exp * 1000)
        const time = new Date()
        const outdated = Data.outdated
        setListOfFriends([])
        if (time === exp || outdated) {
            logout()
        }
        if (Data !== undefined) {
            setUserId(Data._id)
            setProfile(Data.avatar);
            setProfileName(Data.author)
            if (Data.pending !== undefined) {
                setPending(Data.pending)
            }
            if (Data.listfriends !== undefined) {

                if (Data.listfriends.to !== undefined) {
                    Data.listfriends.to.map(item => {
                        if (item.to !== Data._id) {
                            if (item.from === Data._id) {
                                return setListOfFriends(e => [...e, { to: item.from, toName: item.fromName, _id: item._id }])
                            } else {
                                return setListOfFriends(e => [...e, { from: item.from, fromName: item.fromName, _id: item._id }])
                            }
                        } else {
                            return setListOfFriends(e => [...e, { from: item.from, fromName: item.fromName, _id: item._id }])
                        }
                    })
                }
                if (Data.listfriends.from !== undefined) {
                    Data.listfriends.from.map(item => {
                        if (item.from !== Data._id) {
                            if (item.to === Data._id) {
                                return setListOfFriends(e => [...e, { from: item.from, fromName: item.fromName, _id: item._id }])
                            } else {
                                return setListOfFriends(e => [...e, { to: item.to, toName: item.toName, _id: item._id }])
                            }
                        } else {
                            return setListOfFriends(e => [...e, { to: item.to, toName: item.toName, _id: item._id }])
                        }
                    })
                }
            }
        } else {
            return
        }
    }, [])
    const filterPosts = useCallback(() => {
        const searchFilter = (post) => [post.content, post.author]
            .join('')
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1;
        setFilteredPosts(rootPosts.reverse().filter(searchFilter))
        loadProfile()
    }, [search, rootPosts, loadProfile])

    useEffect(() => {
        let isSubscribed = true;

        axios.get('/api/auth/post')
            .then(response => response.data.post)
            .then(Data => {
                if (isSubscribed) {
                    if (Data !== undefined) {
                        setPosts(Data)
                        filterPosts()
                    } else { return }
                }
            }).catch(err => {
                console.error('failed to fetch data: ' + err)
            })
            .finally(() => {
                setDeletePosts()
                setCreatePost()
            })

        return () => { isSubscribed = false }
    }, [profile, createPost, deletePosts,search]);

    return (
        <div>
            <Header user_id={user_id} pending={pending} setSearch={setSearch} />
            <div>
            </div>
            <CreatePost setCreatePost={setCreatePost} avatar={profile} />
            <div className="posts">
                {filteredPosts.map(rootPost => (
                    <PostedPost user_id={user_id} setDeletePosts={setDeletePosts} avatar={profile} key={rootPost._id} posts={rootPost} />
                ))}
            </div>
            <>
                <ChatFunc listOfFriends={listOfFriends} profileName={profileName} />
            </>
        </div>
    );
}

export default HomePage;