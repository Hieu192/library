import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import nodeRoutes from "./routes/model3D/Node.js";
import faceRoutes from "./routes/model3D/Face.js";
import faceNodeRoutes from "./routes/model3D/FaceNode.js";
import constructionRoutes from "./routes/model3D/Construction.js";
import floorRoutes from "./routes/model3D/Floor.js";
import simpleStructureRoutes from "./routes/model3D/SimpleStructure.js";

import cloudinary from 'cloudinary'
import bodyParser from 'body-parser';

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  console.log("Content-Length:", req.headers["content-length"]);
  next();
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

/* Middlewares */

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());


/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/faces", faceRoutes);
app.use("/api/faceNodes", faceNodeRoutes);
app.use("/api/constructions", constructionRoutes);
app.use("/api/floors", floorRoutes);
app.use("/api/simpleStructures", simpleStructureRoutes);

/* MongoDB connection */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGODB CONNECTED thành công");
  }
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
