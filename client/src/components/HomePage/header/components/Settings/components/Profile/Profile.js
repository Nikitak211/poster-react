import {useState , useEffect} from 'react'

const Profile = (props) => {
    
    const [openSttings, setOpenSttings] = useState(false)

    const click = () => {
        if(openSttings){
            props.props.profileSettings(false)
            setOpenSttings(false);
        } else {
            props.props.profileSettings(true)
            setOpenSttings(true)
        }
    }

    
    useEffect(() => {

    },[])
    return ( 
        <li onClick={click} className="setting-profile">Profile</li>
     );
}
 
export default Profile;