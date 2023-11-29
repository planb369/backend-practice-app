import express from "express";
import dotenv from "dotenv";
import { NoteController } from "./adapter/controller/NoteController";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const noteController = new NoteController();
app.get("/api/notes", (req, res) => noteController.getNotes(req, res));
app.get("/api/notes/:id", (req, res) =>
  noteController.getNoteDetails(req, res)
);
app.post("/api/notes", (req, res) => noteController.createNote(req, res));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
