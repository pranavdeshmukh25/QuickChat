import Conversation from "../models/conversationModel.js";
import User from "../models/usersModel.js";
import bcryptjs from 'bcryptjs';

export const getUserBySearch=async(req,res)=>{
try {
    const search = req.query.search || '';
    const currentUserID = req.user._id;
    const user = await User.find({
        $and:[
            {
                $or:[
                    {username:{$regex:'.*'+search+'.*',$options:'i'}},
                    {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                ]
            },{
                _id:{$ne:currentUserID}
            }
        ]
    }).select("-password").select("email")

    res.status(200).send(user)

} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(error);
}
}


export const getCorrentChatters=async(req,res)=>{
    try {
        const currentUserID = req.user._id;
        const currenTChatters = await Conversation.find({
            participants:currentUserID
        }).sort({
            updatedAt: -1
            });

            if(!currenTChatters || currenTChatters.length === 0)  return res.status(200).send([]);

            const partcipantsIDS = currenTChatters.reduce((ids,conversation)=>{
                const otherParticipents = conversation.participants.filter(id => id !== currentUserID);
                return [...ids , ...otherParticipents]
            },[])

            const otherParticipentsIDS = partcipantsIDS.filter(id => id.toString() !== currentUserID.toString());

            const user = await User.find({_id:{$in:otherParticipentsIDS}}).select("-password").select("-email");

            const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

            res.status(200).send(users)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).send({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullname, username, email, gender, password, profilepic } = req.body;

        // Validate input
        if (!fullname || !username || !email || !gender) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if username or email already exists (excluding current user)
        const existingUser = await User.findOne({
            $and: [
                {
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                },
                { _id: { $ne: userId } }
            ]
        });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Username or email already in use"
            });
        }

        const updateData = {
            fullname,
            username,
            email,
            gender
        };

        // Only update password if provided and has minimum length
        if (password) {
            if (password.length < 6) {
                return res.status(400).send({
                    success: false,
                    message: "Password must be at least 6 characters long"
                });
            }
            const hashedPassword = await bcryptjs.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Update profilepic if provided
        if (profilepic) {
            updateData.profilepic = profilepic;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        }).select("-password");

        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}