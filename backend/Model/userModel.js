import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model('USER', userSchema);
export default User;
