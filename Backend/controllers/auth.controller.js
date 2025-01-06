import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export async function signup(req,res) {
    try{
        const {email,password,name} = req.body

        if(!email || !password || !name){
            return res.status(400).json({success:false,message:"All fields are reuired!!!"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email address!!!"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password must be at least 6"})
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"Email already exists!!!"})
        }


        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)



        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        })

        
        generateTokenAndSetCookie(newUser._id, res)
        
        await newUser.save()
        
        res.status(201).json({success:true,message:"User created successfully!!!"})

    }catch(e){
        console.log("Error in SignUp controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})


    }

}

export async function login(req,res) {
    try{
        const {email,password} = req.body
        const existingUserByEmail = await User.findOne({ email: email });
        if(!existingUserByEmail){   
            return res.status(400).json({success:false,message:"Email does not exist!!!"})
        }
        const isValidPassword = await bcryptjs.compare(password, existingUserByEmail.password)
        if(!isValidPassword){
            return res.status(400).json({success:false,message:"Invalid password!!!"})
        }
        generateTokenAndSetCookie(existingUserByEmail._id,res)

        res.status(200).json({success:true,message:"Login successful!!!"})
    }catch(e){
        console.log("Error in Login controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})
    }
}

export async function logout(req,res) {
    
    try{
        res.clearCookie("jwt-tasks")
        res.status(200).json({success:true,message:"Logged out successfully!!!"})
    }catch(e){
        console.log("Error in Logout controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})
    }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


export async function updateProfile(req, res) {
    try {
        const { name, email } = req.body;

        // Validate inputs
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required!"
            });
        }

        // Check if the email already exists in the database (excluding the current user's email)
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Email is already taken by another user!"
            });
        }

        // Update the user profile
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { $set: { name, email } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser
        });
    } catch (e) {
        console.error("Error in updateProfile controller:", e.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

export async function changePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      // Find the user
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!"
        });
      }
  
      // Check if the old password matches
      const isMatch = await bcryptjs.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect!"
        });
      }
  
      // Hash the new password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(newPassword, salt);
  
      // Update the password
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password changed successfully!"
      })
    } catch (e) {
      console.error("Error in changePassword controller:", e.message);
      res.status(500).json({
        success: false,
        message: "Internal server error!"
      });
    }
  }
  