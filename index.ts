import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/noteRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.use("/", notesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
