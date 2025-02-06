import express from 'express';
import jwt from 'jsonwebtoken';  
import Message from '../models/Message.js';  

const router = express.Router();


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secretkey');  
    req.user = decoded;  
    next();  
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


router.post('/message', verifyToken, async (req, res) => {
  const { from_user, room, message } = req.body;
  
  const newMessage = new Message({ from_user, room, message });
  await newMessage.save();

  res.status(201).json({ message: 'Message sent' });
});

export default router;
