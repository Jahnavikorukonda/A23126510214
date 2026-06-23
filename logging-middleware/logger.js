require("dotenv").config();

const axios = require("axios");

const Log = async (stack, level, packageName, message) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Logging Error:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = Log;