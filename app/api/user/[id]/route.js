import { connectToDB } from "@utils/database";
import { Prompt } from "@models/prompt.models";
import { User } from "@models/user.models";

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.deleteMany({creator: params.id});

        await User.findByIdAndDelete(params.id)

        return new Response('Prompt deleted successfully', { status: 200 });

    } catch (error) {
        console.log('ran into this error')
        return new Response('Failed to delete Prompt', { status: 500 })

    }
}