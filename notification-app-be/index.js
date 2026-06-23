require("dotenv").config();

const express = require("express");
const axios = require("axios");

const {
  getTopNotifications
} = require("./priorityInbox");

const app = express();

app.use(express.json());

app.get("/priority-notifications", async (req, res) => {

  try {

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        },
        timeout: 10000
      }
    );

    const notifications =
      response.data.notifications || [];

    const top10 =
      getTopNotifications(notifications, 10);

    res.status(200).json({
      count: top10.length,
      notifications: top10
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Unable to fetch notifications",
      error: error.message
    });
  }
});

app.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );
});