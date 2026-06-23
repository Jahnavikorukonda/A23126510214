require("dotenv").config();

const runScheduler = require("./scheduler");

(async () => {
  try {
    await runScheduler();
  } catch (error) {
    console.error("Application Error:", error.message);
  }
})();