const LoginForm = () => {

    return ( 
        <form action="">
            <div>
                <label className="label">Email</label>
                <input type="email" name="email"></input>
            </div>
            <div>
                <label className="label">Password</label>
                <input type="Password" name="Password"></input>
            </div>
            <button>Login</button>
            <ul className="btn btn-ul">
                <li className="btn btn-li">Forgot password</li>
                <li className="btn btn-li">Sign in with Google</li>
            </ul>
        </form>
     );
}
 
export default LoginForm;