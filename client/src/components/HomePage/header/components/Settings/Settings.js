import {useState,useEffect} from 'react'

import  Profile from './components/Profile/Profile'
import LogoutButton from '../LogoutButton/LogoutButton';

import './Settings.css'

const Settings = (props) => {

    const [click,setClick] = useState(false)

        const Clicked = () => {
            if(click) {
                setClick(false)
            } else {
                setClick(true)
            }
        }
        useEffect(() => {

        },[])
        
            if(click) {
                return (
                    <div className="settings-open-container">
                        <div onClick={Clicked} className="settings-container"></div>
                        <ul className="settings-ul">
                        <Profile props={props}/>
                        <LogoutButton />
                        </ul>
                        
                    </div>
                )
            } else {
                return ( 
                    <div onClick={Clicked} className="settings-container"></div>
                 );
            }
        


    
}
 
export default Settings;