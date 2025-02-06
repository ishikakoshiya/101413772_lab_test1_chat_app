import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect(process.env.MONGO_URI) 
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('joinRoom', ({ username, room }) => {
    users[socket.id] = username; 
    socket.join(room);
    console.log(`${username} joined ${room}`);
  });

  socket.on('sendMessage', ({ message, room, username }) => {
    io.to(room).emit('message', { username, message }); 
    console.log('Message Sent:', message);
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
