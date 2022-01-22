import './Header.css'

const Header = ({visibleRegister, visibleLogin, setVisibleLogin, setVisibleRegister}) => {


    return (
        <header>
            <ul>
                <li><button className="btn-headers" onClick={() => visibleLogin ? (setVisibleLogin(false) , setVisibleRegister(false)):(setVisibleLogin(true) ,setVisibleRegister(false))}>Login</button></li>
                <li><button className="btn-headers" onClick={() => visibleRegister ? (setVisibleRegister(false), setVisibleLogin(false)):(setVisibleRegister(true), setVisibleLogin(false))}>Register</button></li>
               
                <li>Forum</li>
                <li>About us</li>

            </ul>
        </header>

    );
}

export default Header;