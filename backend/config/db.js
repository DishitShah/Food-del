import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dishit:dishit@cluster0.k8xzmly.mongodb.net/food-del').then(()=>console.log("Database connected")); 
}