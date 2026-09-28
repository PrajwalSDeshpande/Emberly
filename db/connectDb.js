import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error;
    }
}

export default connectDb;