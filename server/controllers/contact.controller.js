const Contact = require("../models/contact.model");

exports.sendMessage = async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.json({
            message: "Message received successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};