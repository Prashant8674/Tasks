import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewere/auth.js';

router.use('/loggeduser',checkUserAuth);

router.post('/register', UserController.UserRegistration);

router.post('/login',UserController.userLogin);

router.get('/loggeduser',UserController.loggedUser);
export default router;