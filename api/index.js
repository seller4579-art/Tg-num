const express = require('express');
const app = express();

const TG_API_KEY = "FIGHTER";

// ---------------- Home Route ----------------
app.get('/', (req, res) => {
  res.json({
    status: "running ✅",
    endpoint: "/advanced/tg2num?q=@username",
    developer: "@Boss_Hcrr"
  });
});

// ---------------- Telegram to Number Route ----------------
app.get('/advanced/tg2num', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: false,
        error: "Telegram username (q) is required"
      });
    }

    const response = await fetch(
      `https://sahilxher.madewith.me/api/tg?key=${TG_API_KEY}&number=${encodeURIComponent(q)}`
    );

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
