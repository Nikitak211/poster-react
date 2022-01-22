import React, { useState, useEffect } from 'react'

import './Chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chats = (prop) => {
    const [currentMessage, setCurrentMessage] = useState()
    const [messagesList, setMessagesList] = useState([])

    const socket = prop.socket
    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: prop.room,
                author: prop.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            };

            await socket.emit('send_message', messageData)
            setMessagesList((list) => [...list, messageData]);
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessagesList((list) => [...list, data]);
        })
    }, [socket])

    return (
        <div className="chat-window" >
            <div onClick={() => prop.setClicked(false)} className="chat-header">
                <p onClick={() => prop.setClicked(false)}>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messagesList.map(message => {
                        return <div key={(message.time + message.author + message.message)} className="message" id={prop.username === message.author ? "you" : 'other'}>
                            <div>
                                <div className="message-content">
                                    <p>{message.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time" style={{ color: "black" }}>{message.time}</p>
                                    <p id="author" style={{ color: "black" }}>{message.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="hi..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                        e.key === 'Enter' && sendMessage()
                    }}
                ></input>
                <button onClick={sendMessage} style={{ backgroundColor: "black" }}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chats;