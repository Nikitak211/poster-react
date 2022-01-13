import Profile from './components/Profile/Profile'
import Search from './components/search/Search'
import LogoutButton from '../components/LogoutButton/LogoutButton';
import './Header.css'

const Header = (props) => {

    return (
        <header>
            <Profile props={props} />
            <ul>
                <Search props={props.props} />
                <LogoutButton />
            </ul>
        </header>
    );
}

export default Header;