const Result = require("../models/Result");

// Save result
exports.saveResult = async (req, res) => {

    try {

        const { name, score } = req.body;

        const result = new Result({
            name,
            score
        });

        await result.save();

        res.status(201).json({
            message: "Result saved successfully",
            result
        });

    } catch (error) {

        res.status(500).json({
            message: "Error saving result",
            error: error.message
        });

    }

};


// Get all results
exports.getResults = async (req, res) => {

    try {

        const results = await Result.find().sort({ score: -1 });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching results",
            error: error.message
        });

    }

};