import { useEffect } from 'react';

import Search from './components/search/Search'

import './Header.css'
import Settings from './components/Settings/Settings';

const Header = (props) => {
    useEffect(() => {

    },[])
    return (
        <header>
            <h2 style={{marginLeft: 10}}>Poster</h2>
            <ul>
                <Search props={props} />
                
            </ul>
            <Settings/>
        </header>
    );
}

export default Header;