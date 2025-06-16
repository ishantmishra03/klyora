import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.models.js'


//API for signing up user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //Check is user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ success: false, message: "User exists already" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            name, email, password: hashedPassword,
        });

        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, user: createdUser.name });

    } catch (error) {
        console.log("Register Error", error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//API for logging USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ success: true, user: user.name });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//API for logging OUT USER
export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.status(200).json({ success: true, message: "Logged Out" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//API to check if user is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


