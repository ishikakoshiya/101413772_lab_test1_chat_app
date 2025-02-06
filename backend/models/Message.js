import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from_user: String,
  room: String, // Null if private message
  to_user: String, // Null if group message
  message: String,
  date_sent: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);
