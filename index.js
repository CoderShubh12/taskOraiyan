import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./config/db.js";
import FormRoutes from "./Routes/formRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/form", FormRoutes);

let port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
