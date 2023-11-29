import express from "express";
import dotenv from "dotenv";
import { NoteController } from "./adapter/controller/NotesController";
import { GetNotesUseCase } from "./application/usecase/GetNotesUseCase";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//依存性を注入してNoteControllerのインスタンスを作成
const noteController = new NoteController();

//app.use("/", routes);

app.get("/api/notes", (req, res) => noteController.getNotes(req, res));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
