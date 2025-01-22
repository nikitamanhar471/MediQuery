const express = require("express");
const router = express.Router();
const { generateResponse } = require("../controllers/chatController");

router.post("/", async (req, res) => {
    const userQuery = req.body.prompt?.toLowerCase();

    if (!userQuery) {
        return res.status(400).json({
            response: "Invalid query. Please provide a valid query.",
        });
    }

    // Custom response for developer-related questions
    if (userQuery.includes("developer") || userQuery.includes("team")) {
        return res.json({
            response: "Nikita Manhar & Team",
        });
    }

    try {
        // Generate AI response if no custom response
        const aiResponse = await generateResponse(userQuery);
        res.json({
            response: aiResponse,
        });
    } catch (error) {
        res.status(500).json({
            response: "Error generating AI response. Please try again later.",
        });
    }
});

module.exports = router;
