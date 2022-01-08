import axios from "axios"

const LogoutButton = () => {

    async function logout() {
        const response = await axios.post('/api/auth/logout')
        const json = await response.data
        console.log(json)
        if (json.success) {
            window.location.reload()
            alert(json.message)
        }
        if (json.error) alert(json.message)
    }

    return ( 
            <li className="logout"
            onClick={logout}
            >Logout</li>
     );
}
 
export default LogoutButton;