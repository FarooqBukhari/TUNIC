import React, { useEffect, useState } from 'react';
import config from '../config';
import { io } from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BottomBar from '../components/BottomBar';
import '../chat.css';
import { useSelector } from 'react-redux';

const ChatScreen = ({ history, match }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [chat, setChat] = useState([])
    const [socket] = useState(io.connect(config[process.env.NODE_ENV].endpoint));
    const [userId] = useState(userInfo.isHelpDeskAdmin || userInfo.isSuperAdmin ? match.params.userId : userInfo._id);

    // Update the chat if a new message is broadcasted.
    socket.on('push', (msg) => {
        setChat([...chat, msg]);
        scrollToBottom();
    });
    useEffect(() => {
        socket.on('connection', () => {
            console.log(`I'm connected with the back-end`);
        });
        // Load the last 20 messages in the window.
        socket.on('init', (msg) => {
            let msgReversed = msg.reverse();
            setChat([...msgReversed]);
            scrollToBottom()
        });
        socket.emit('userId', {
            userId: userId
        });
    }, [userId])

    const handleSubmit = (content) => {
        // Send the new message to the server.
        let msg = {
            name: userInfo.name,
            content: content,
            userId: userId
        }
        socket.emit('message', msg);

        setChat([...chat, msg]);
        scrollToBottom()
    }

    // Always make sure the window is scrolled down to the last message.
    const scrollToBottom = () => {
        const chat = document.getElementById('chat');
        if (chat)
            chat.scrollTop = chat.scrollHeight;
    }

    return (
        <div className="App">
            <Paper id="chat" elevation={3}>
                {chat.map((el, index) => {
                    return (
                        <div key={index}>
                            <Typography variant="caption" className="name">
                                {el.name}
                            </Typography>
                            <Typography variant="body1" className="content">
                                {el.content}
                            </Typography>
                        </div>
                    );
                })}
            </Paper>
            <BottomBar
                handleSubmit={handleSubmit}
                name={userInfo.name}
            />
        </div>
    );
};

export default ChatScreen;