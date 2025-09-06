const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// 🔑 حط الـ API Key هنا
const genAI = new GoogleGenerativeAI("AIzaSyBWvaTqzzA73blKI5oU-CA-i6DLorbZCt8");

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ حصل خطأ أثناء الاتصال بالذكاء الاصطناعي." });
  }
});

// على Vercel، متنساش تعمل export
module.exports = app;
