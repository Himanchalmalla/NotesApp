import express from 'express';
import authorizationKey from '../MiddleWare/verifyToken.js';
import {
  addUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  logUser,
  logoutUser,
} from '../Controller/userController.js';
const router = express.Router();

router.post('/', addUser);
router.get('/', getUser);
router.get('/detail', authorizationKey, getSingleUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', logUser);
router.post('/logout', logoutUser);

export default router;
