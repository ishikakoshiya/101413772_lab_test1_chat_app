import express from 'express';
import jwt from 'jsonwebtoken';  // Import JWT
import Message from '../models/Message.js';  // Your Message model

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secretkey');  // Use your secret key
    req.user = decoded;  // Attach the decoded user to the request object
    next();  // Proceed to the route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Secured Route to send a message
router.post('/message', verifyToken, async (req, res) => {
  const { from_user, room, message } = req.body;
  
  const newMessage = new Message({ from_user, room, message });
  await newMessage.save();

  res.status(201).json({ message: 'Message sent' });
});

export default router;
