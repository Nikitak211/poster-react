import Login from './components/LoginLi/Login';
import Register from './components/RegisterLi/Register';
import './Header.css'

const Header = (props) => {
    return (
        <header>
            <ul>
                <Login props={props} />
                <Register props={props} />
                <li>Forum</li>
                <li>About us</li>

            </ul>
        </header>

    );
}

export default Header;