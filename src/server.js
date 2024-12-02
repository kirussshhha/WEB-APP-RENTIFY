import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/connection.js";
import userRoutes from "./delivery/routes/userRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use("/user", userRoutes);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is listening on port ${port}`);
});
