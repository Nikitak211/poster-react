import io from 'socket.io-client'

import { useState, useEffect } from 'react'
import './Chat.css'

import Chats from './Chats';

const socket = io.connect('http://localhost:7000/')

const ChatFunc = (props) => {
    const [username, setUsername] = useState('');
    const [Room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [btnCss, setBtnCss] = useState('btn-friends-list')
    
    const JoinRoom = (room) => {
        if (username !== "" && room !== "") {
            socket.emit('join_room', room)
            setRoom(room)
            setShowChat(true)
        }
    }
    const click = () => {
        if (clicked) {
            setClicked(false)
            setBtnCss("btn-friends-list hide")
        } else {
            setClicked(true)
            setBtnCss("btn-friends-list show")
        }
    }

    useEffect(() => {
        setUsername(props.profileName)
    }, [])

    return (
        <>
            {!showChat ? (
                <div className="joinChatContainer">

                    {!clicked ? (
                        <div className="show-open-friends-container">
                            <div className={btnCss}>
                                <button

                                    onClick={click}
                                >Friends List</button>
                            </div>
                        </div>
                    ) : (
                        <div className="show-open-friends-container">
                            <div className="show-open-friends">
                                <ul className="friends-ul">
                                    {props.listOfFriends !== undefined ? (props.listOfFriends.map(list => {

                                        let to = list.to
                                        let toName = list.toName
                                        let from = list.from
                                        let fromName = list.fromName
                                        let _id = list._id

                                        return <li key={to || from} onClick={() => JoinRoom(_id)} className="friends-li">{toName || fromName}</li>
                                    })) : (<li className="friends-li">fuck</li>)}
                                </ul>
                            </div>
                            <div className={btnCss}>
                                <button
                                    onClick={click}
                                >Close Friends List</button>
                            </div>
                        </div>
                    )}
                </div>
            )
                : (
                    <Chats setClicked={setShowChat} socket={socket} username={username} room={Room}></Chats>
                )}
        </>
    );
}

export default ChatFunc;