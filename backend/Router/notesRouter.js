import express from 'express';
import {
  addNotes,
  deleteNotes,
  getAllNotes,
  getMyNotes,
  updateNotes,
  getSingleNotes,
} from '../Controller/notesController.js';
import authorizationKey from '../MiddleWare/verifyToken.js';
const router = express.Router();

router.post('/', authorizationKey, addNotes);
router.patch('/:id', authorizationKey, updateNotes);
router.get('/myNotes/:id', getSingleNotes);
router.get('/', getAllNotes);
router.get('/myNotes', authorizationKey, getMyNotes);
router.delete('/:id', authorizationKey, deleteNotes);

export default router;
