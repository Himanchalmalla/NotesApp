import mongoose from 'mongoose';

const DB =
  'mongodb+srv://himanchalmalla:password1234@cluster0.nvtjr.mongodb.net/Notes?retryWrites=true&w=majority';
const connection = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log('connected');
    } else {
      console.log('Failed to connect');
    }
  } catch (e) {
    console.log('Connection Failed ' + e);
  }
};
await connection();
