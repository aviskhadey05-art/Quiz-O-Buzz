const User = require("../models//user.model");

exports.getCurrentUser = async (req, res) => {

    try {

        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};