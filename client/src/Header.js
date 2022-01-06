
const Header = (props) => {
    return (
        <header>
            <ul>
                <li
                onClick={() => {
                    if (props.visibleLogin){
                        props.setVisibleRegister(true)
                        props.setVisibleLogin(false)
                    } else {
                        props.setVisibleLogin(true)
                    }
                    
                }}
                >Login</li>
                <li
                onClick={() => {
                    if (props.visibleRegister){
                        props.setVisibleLogin(true)
                        props.setVisibleRegister(false)
                    } else {
                        props.setVisibleRegister(true)
                    }
                    
                }}
                >Register</li>
                <li>Forum</li>
                <li>About us</li>
                
            </ul>
        </header>
        
    );
}
 
export default Header;