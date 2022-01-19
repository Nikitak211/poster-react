import io from 'socket.io-client'

import { useState, useEffect } from 'react'

import Chats from './Chats';

const socket = io.connect('http://localhost:7000/')

const ChatFunc = (props) => {

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false)

    const JoinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit('join_room', room)
            
            setShowChat(true)
        }
    }

    useEffect(() => {
        setUsername(props.profileName)
    }, [])

    return (
        <div>
            {!showChat ? (
                <div className="joinChatContainer">
                    <input
                        type="text"
                        placeholder='room ID'
                        onChange={(e) => setRoom(e.target.value)}
                        style={{ backgroundColor: "black" }}
                    ></input>
                    <button
                        style={{ backgroundColor: "black" }}
                        onClick={JoinRoom}
                    >Join a room</button>
                </div>
            )
                : (
                    <Chats socket={socket} username={username} room={room}></Chats>
                )}
        </div>
    );
}

export default ChatFunc;