import mongoose from 'mongoose';
const ObjectID  = mongoose.Types.ObjectId;
const todayDate =new Date();
const date = `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDate()}`
const noteSchema = new mongoose.Schema({
    title:{type:String, require:true},
    note:{type:String, require:true},
    userId:{type:ObjectID, require:true},
    uploadedDate:{type:String, default:date}
});

const Note  = mongoose.model('NOTES', noteSchema);
export default Note;