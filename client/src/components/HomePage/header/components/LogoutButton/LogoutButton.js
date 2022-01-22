import { useEffect } from "react"
import axios from "axios"

const LogoutButton = () => {

    async function logout() {
        const response = await axios.post('/api/auth/logout')
        const json = await response.data
        if (json.success) {
            window.location.reload()
            alert(json.message)
        }
        if (json.error) alert(json.message)
    }

    useEffect(() => {
    }, [])

    return (
        <li className="logout"
            onClick={logout}
        >Logout</li>
    );
}

export default LogoutButton;