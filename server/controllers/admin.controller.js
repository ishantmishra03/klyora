import jwt from 'jsonwebtoken';

//Admin Login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        let token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//Admin Logout
export const adminLogout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API to check if user is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message : "Authenticated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
