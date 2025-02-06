import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstname: String,
  lastname: String,
  password: String,
  createdOn: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
