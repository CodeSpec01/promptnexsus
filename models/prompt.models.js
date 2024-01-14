import mongoose, { mongo } from "mongoose";

const promptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    }
},{timestamps: true});

export const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);