import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, verifyOrder,listOrders,updateStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder); // Use GET for URL parameters
orderRouter.post("/userorders",authMiddleware,userOrders); // Use POST for request body
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;
