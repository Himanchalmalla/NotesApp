import mongoose from 'mongoose';
import Note from '../Model/noteModel.js';
import User from '../Model/userModel.js';
export const addNotes = async (req, res) => {
  const { id } = req.user;
  const userId = new mongoose.Types.ObjectId(id);
  const { title, note } = req.body;
  try {
    const newNote = new Note({ title, note, userId });
    const addNote = await newNote.save();
    if (!addNote) return res.status(408).json('Failed to add Note');
    res.status(200).json('Note added successFully');
  } catch (e) {}
};
export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, note } = req.body;
  try {
    const updateNote = await Note.findByIdAndUpdate(id);
    if (!updateNote) return res.status(404).json('Note not found');
    if (title) {
      updateNote.title = title;
    }
    if (note) {
      updateNote.note = note;
    }
    const saveUpdate = await updateNote.save();
    if (!saveUpdate) return res.status(408).json('failed to update');
    res.status(200).json('note updated successfully!!');
  } catch (e) {
    console.log(e);
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const getNotes = await User.aggregate([
      {
        $lookup: {
          from: 'notes',
          localField: '_id',
          foreignField: 'userId',
          as: 'notes_doc',
        },
      },
      { $unwind: '$notes_doc' },
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          notes: '$notes_doc.note',
          title: '$notes_doc.title',
          uploadedDate: '$notes_doc.uploadedDate',
        },
      },
    ]);
    if (!getNotes) return res.status(404).json('Notes not found');

    res.status(200).json(getNotes);
  } catch (e) {
    console.log(e);
  }
};

export const getMyNotes = async (req, res) => {
  const { id } = req.user;
  const userId = new mongoose.Types.ObjectId(id);
  try {
    const getMyNotes = await Note.find({ userId });
    if (!getMyNotes) return res.status(404).json('No Notes Uploaded');
    res.status(200).json(getMyNotes);
  } catch (e) {
    console.log(e);
  }
};

export const getSingleNotes = async (req, res) => {
  const id = req.params.id;
  try {
    const getNotes = await Note.findById(id);
    if (!getNotes) return res.status(404).json('Note not found');
    res.status(200).json(getNotes);
  } catch (e) {}
};
export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) return res.status(404).json('Failed to delete');
    res.status(200).json('Deleted successfully!!');
  } catch (e) {
    console.log(e);
  }
};
