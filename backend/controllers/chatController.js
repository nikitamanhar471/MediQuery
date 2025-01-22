const { exec } = require("child_process");
const path = require("path");

const generateResponse = (prompt) => {
  const pythonScriptPath = path.resolve(__dirname, "../chat_bot.py");

  return new Promise((resolve, reject) => {
    exec(`python ${pythonScriptPath} "${prompt}"`, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", error);
        return reject("Failed to generate a response.");
      }
      if (stderr) {
        console.error("Python script stderr:", stderr);
      }
      console.log("Bot response:", stdout.trim());
      resolve(stdout.trim());
    });
  });
};

module.exports = { generateResponse };
