import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import articleRouter from "./routes/articleRoutes.js";

const app = express();
const port = 8000;

// Change this if your MongoDB runs somewhere else (e.g. MongoDB Atlas link)
const dbUrl = "mongodb+srv://admin:admin123@cluster0.f8i4awh.mongodb.net/newsapp?retryWrites=true&w=majority";

// middleware: runs on every request before our routes
app.use(cors()); // lets the React app (port 5173) talk to this server (port 8000)
app.use(express.json()); // lets us read JSON sent in req.body

// all article routes start with /articles
app.use("/articles", articleRouter);

// connect to MongoDB first, then start the server
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
