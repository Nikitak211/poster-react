import { useEffect } from 'react';

import Search from './components/search/Search'

import './Header.css'
import Settings from './components/Settings/Settings';
import Notification from './components/Notification/Notification'
const Header = (props) => {
    useEffect(() => {

    },[])
    return (
        <header>
            <h2 style={{marginLeft: 10}}>Poster</h2>
            <Notification props={props}/>
            
            <ul>
                <Search props={props} />
                
            </ul>
            <Settings/>
        </header>
    );
}

export default Header;