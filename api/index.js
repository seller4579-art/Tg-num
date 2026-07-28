const express = require('express');
const app = express();

const TG_API_KEY = "DengerxTrusted_Robotx2807";
const UPSTREAM_TG_NUM_URL = process.env.UPSTREAM_TG_NUM_URL || "https://tg-to-num-pink.vercel.app/tgnum";

// ---------------- Home Route ----------------
app.get('/', (req, res) => {
  res.json({
    status: "running ✅",
    endpoint: "/advanced/tg2num?q=@username",
    developer: "@Boss_Hcrr"
  });
});

// ---------------- Telegram to Number Route (fully dynamic) ----------------
app.get('/advanced/tg2num', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: false,
        error: "Telegram username (q) is required"
      });
    }

    const username = encodeURIComponent(q);
    const upstreamUrl = `${UPSTREAM_TG_NUM_URL}?tgusername=${username}`;

    const response = await fetch(upstreamUrl);

    if (!response.ok) {
      return res.status(500).json({
        status: false,
        error: "External API failed"
      });
    }

    const data = await response.json() || {};
    data.developer = "@Boss_Hcrr";

    return res.json(data);

  } catch (err) {
    return res.status(500).json({
      status: false,
      error: "Server crashed",
      details: err.message
    });
  }
});

// ---------------- 404 Handler ----------------
app.use((req, res) => {
  res.status(404).json({
    status: false,
    error: "Route not found"
  });
});

module.exports = app;
