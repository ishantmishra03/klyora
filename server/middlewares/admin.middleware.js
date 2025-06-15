import User from '../models/user.models.js';

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId); 

    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
