import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { type } from "os";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
});

const reactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    requestInfo: { type: Object },
    createdAt: { type: Date, default: Date.now },
})

const Reaction = mongoose.model("Reaction", reactionSchema);

function log(req, res, next) {
    const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    req.ip; 
  const logData = {
    method: req.method,
    url: req.originalUrl,
    ip: ip,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  };
  console.log("Ukhangela Ntoni?!", logData);
  req.logData = logData;
  next();
}


app.set("view engine", "ejs"); 
app.use(log);
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("views"));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/leaderboard", async (req, res) => {
  try {
    const reactions = await Reaction.find().sort({ createdAt: -1 });
    res.render("leaderboard", { reactions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/submit", async (req, res) => {
  try {
    const { name, reaction } = req.body;

    if (!name || !reaction) {
      return res.status(400).json({ success: false, message: "Name and reaction time required" });
    }

    
    const newReaction = new Reaction({
      name,
      time: reaction,
      requestInfo: req.logData,
    });

    await newReaction.save();

    res.json({ success: true, message: "Reaction saved!", data: newReaction });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
