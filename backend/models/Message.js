import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from_user: String,
  room: String,
  to_user: String, 
  message: String,
  date_sent: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);
