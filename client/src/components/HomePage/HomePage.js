import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './header/Header';
import PostedPost from './components/PostedPost/PostedPost';
import CreatePost from './components/CreatePost/CreatePost'

const HomePage = () => {
    const [searching,setSearching] = useState();
    const [profile, setProfile] = useState();
    const [profileName, setProfileName] = useState();
    
    const loadProfile = async ()  =>  {
        const response = await axios('/api/auth/logged')
        const Data = await response.data
        const exp = new Date(Data.exp * 1000)
        const time = new Date()
        const outdated = Data.outdated

        if(time == exp || outdated){
            async function logout() {
                const response = await axios.post('/api/auth/logout')
                const json = await response.data
                console.log(json)
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
    loadProfile()
    // useEffect(() => {
    //     loadProfile()
    // },)

    return ( 
        <div>
        <Header profile={profile} profileName={profileName} />
        <CreatePost/>
        <PostedPost/>
        </div>
     );
}
 
export default HomePage;