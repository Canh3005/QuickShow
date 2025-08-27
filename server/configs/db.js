import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
    } catch (error) {
        console.error(error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;
