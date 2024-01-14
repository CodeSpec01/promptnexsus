import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
        })

        isConnected = true;
        console.log('Mongo DB connected Successfully')
    } catch (error) {
        console.log('Error while connecting to MongoDB: ',error)
    }
}