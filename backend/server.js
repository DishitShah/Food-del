import express from 'express';
import cors from 'cors';
import foodRouter from './routes/foodRoute.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// App config
const app = express();
const port = process.env.PORT || 4000;


// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow frontend to backend communication

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port} or http://localhost:${port}`);
});
