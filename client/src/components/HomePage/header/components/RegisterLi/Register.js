const Register = (props) => {
    return (
        <li
            onClick={() => {
                if (props.props.visibleRegister) {
                    props.props.setVisibleLogin(true);
                    props.props.setVisibleRegister(false);
                } else {
                    props.props.setVisibleRegister(true);
                }
            }}
        >Register</li>
    );
}

export default Register;