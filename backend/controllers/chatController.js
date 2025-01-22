const { exec } = require("child_process");
const path = require("path");

let conversationContext = []; // Stateful conversation context

const generateResponse = (prompt) => {
  const pythonScriptPath = path.resolve(__dirname, "../chat_bot.py");

  return new Promise((resolve, reject) => {
    try {
      // Safely encode context as a JSON string
      const contextJson = JSON.stringify(conversationContext);

      // Execute Python script with properly escaped arguments
      const command = `python "${pythonScriptPath}" "${prompt.replace(/"/g, '\\"')}" "${contextJson.replace(/"/g, '\\"')}"`;

      exec(command, { encoding: "utf8" }, (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing Python script:", error);
          return reject("Failed to generate a response.");
        }
        if (stderr) {
          console.error("Python script stderr:", stderr);
        }

        const response = stdout.trim();
        console.log("Bot response:", response);

        // Update conversation context
        conversationContext.push([prompt, response]);

        resolve(response);
      });
    } catch (err) {
      console.error("Error generating response:", err);
      reject("Failed to process request.");
    }
  });
};

module.exports = { generateResponse };
