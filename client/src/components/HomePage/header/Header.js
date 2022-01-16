import { useEffect } from 'react';

import Profile from './components/Profile/Profile'
import Search from './components/search/Search'
import LogoutButton from '../components/LogoutButton/LogoutButton';
import './Header.css'
import Settings from './components/Settings/Settings';

const Header = (props) => {
    useEffect(() => {

    },[])
    return (
        <header>
            <Profile props={props} />
            <ul>
                <Search props={props.props} />
                <LogoutButton />
                
            </ul>
            <Settings profileSettings={props.profileSettings}/>
        </header>
    );
}

export default Header;