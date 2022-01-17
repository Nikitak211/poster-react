import { useState, useEffect } from 'react'

import HomePage from './components/HomePage/HomePage'
import Profile from './components/Profile/Profile'
import LogoutButton from '../LogoutButton/LogoutButton';


import './Settings.css'

const Settings = () => {

    const [click, setClick] = useState(false)
    const [css, setCss] = useState("settings-open-container")

    const Clicked = () => {
        if (click) {
            setCss("settings-open-container hide")
            setClick(false)
        } else {
            setCss("settings-open-container show")
            setClick(true)
        }
    }
    useEffect(() => {

    }, [])

    if (click) {
        return (
            <div className="settings-meta">
                <div className="settings-container-box">
                    <div onClick={Clicked} className="settings-container"></div>
                </div>
                <div className={css}>
                    <ul className="settings-ul">
                        <HomePage/>
                        <Profile />
                        <LogoutButton />
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div className="settings-meta">
                <div className="settings-container-box">
                    <div onClick={Clicked} className="settings-container"></div>
                </div>
                <div className={css}>
                </div>
            </div>
        );
    }




}

export default Settings;