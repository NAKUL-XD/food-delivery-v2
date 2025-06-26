import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeFromCart);

// 🔁 changed from GET to POST to allow body or use auth-based userId
cartRouter.post('/get', authMiddleware, getCart);

export default cartRouter;
