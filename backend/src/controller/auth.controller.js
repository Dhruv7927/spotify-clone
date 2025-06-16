import { User } from '../models/user.model.js';

export const authCallback = async(req, res) => {
    try{
        const { id, firstName, lastName, imageUrl } = req.body;

        const user = await User.findOne({clerkId: id});
        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl: imageUrl
            })
        }
        res.status(200).json({ message: "User authenticated successfully", success: true });
    } catch (error){
        console.error("Error in authCallback:", error);
        next(error);
    }
}