import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../model/user.js";

const userauth=Router();

userauth.post('/signup', async (req, res) => {
    try {
        
        const { FirstName, LastName, UserName, password } = req.body;
        const existingUser = await User.findOne({ userName: UserName });
        if (existingUser) {
            return res.status(400).json({ error: "This username already exists" });
        }

        const newpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newpassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


userauth.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        if (!UserName || !Password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }

        
        const user = await User.findOne({ userName: UserName });

        if (!user) {
            return res.status(400).json({ msg: "Enter a valid username" });
        }

        const valid = await bcrypt.compare(Password, user.password);

        if (!valid) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const token = jwt.sign(
            { userId: user._id, userName: user.userName, userRole: "user" }, 
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('certiapp', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict'
        });

        res.status(200).json({ message: "Logged in successfully", token });

    } catch (error) {
        console.error("Login error:", error);  
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


userauth.get('/logout',(req,res)=>{
    res.clearCookie('certiapp');
    res.status(200).send("successfuly logout")
})

 export{userauth};