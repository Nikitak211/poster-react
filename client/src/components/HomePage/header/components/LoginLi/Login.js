const Login = (props) => {
    return ( 
        <li
            onClick={() => {
                if (props.props.visibleLogin){
                    props.props.setVisibleRegister(true)
                    props.props.setVisibleLogin(false)
                } else {
                    props.props.setVisibleLogin(true)
                }
                
            }}
        >Login</li> );
}
 
export default Login;