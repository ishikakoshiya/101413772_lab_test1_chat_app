import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');  

function ChatRoom({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!user) return;
    socket.emit('joinRoom', { username: user.username, room: 'room1' }); 

    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('typing', (username) => {
      setTyping(username);
    });

    return () => {
      socket.emit('leaveRoom', { username: user.username, room: 'room1' });
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');  

    const response = await fetch('http://localhost:5001/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      },
      body: JSON.stringify({ from_user: user.username, room: 'room1', message })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Message Sent:', data);
    } else {
      console.log('Error:', data.error);
    }

    
    socket.emit('sendMessage', { message, room: 'room1', username: user.username });
    setMessage('');
  };

  const handleTyping = () => {
    socket.emit('typing', user.username);
  };

  if (!user) {
    return <p>Please log in to join the chat.</p>; 
  }

  return (
    <div className="chatroom-container">
      <h2>Welcome, {user.username}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => { setMessage(e.target.value); handleTyping(); }}
      />
      <button onClick={sendMessage}>Send</button>
      {typing && <p>{typing} is typing...</p>}
    </div>
  );
}

export default ChatRoom;
