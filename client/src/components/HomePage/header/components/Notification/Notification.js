import { useEffect , useState} from 'react';

import axios from 'axios';

import './Notification.css';

const Notification = ({ props }) => {
    const [clicked, setClicked] = useState(false)
    const [css, setCss] = useState("notification-open-container hide")

    const click = () => {
        if (clicked) {
            setCss("notification-open-container hide")
            setClicked(false)
        } else {
            setCss("notification-open-container show")
            setClicked(true)
        }
    }

    const acceptFriendRequest = async (puid) => {
        if(props.user_id !== undefined) {
            await axios.post('/api/auth/acceptRequest',{
                uid:props.user_id,
                puid
            })
        }
        
    }
    
    useEffect(() => {

    },[acceptFriendRequest])

    return (
        <>
            {clicked ? (

                <div className="notification-meta">
                    <div className="notification-container-box">
                        <div onClick={click} className="notification-bell"></div>
                    </div>
                    <div className={css}>
                    <ul className="notification-ul">
                        {props.pending.map(pending => {
                            let id = pending.from
                            let name = pending.fromName
                            return <li key={pending} style={{ color: 'black', fontSize: '6px',height: '1.8em' , cursor: 'default' }}>{name}<p onClick={() => acceptFriendRequest(id)} style={{ color: 'black', fontSize: '10px', cursor:'pointer'}}>+</p></li>
                        })}
                    </ul>
                    </div>
                </div>
            ) : (
                <div className="notification-meta">
                    <div className="notification-container-box" >
                        <div onClick={click} className="notification-bell"></div>
                        <div className="notification-count">
                            {props.pending.length !== 0 ? (<p>{props.pending.length}</p>) : <div></div>}
                        </div>
                    </div>
                    <div className={css}></div>
                </div>
            )
            }
        </>
    );
}

export default Notification;