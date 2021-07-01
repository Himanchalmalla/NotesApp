import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  authToken: { type: String },
});

const Auth = mongoose.model('AUTH', authSchema);
export default Auth;
