import express from "express";
import dotenv from "dotenv";
import { NoteController } from "./adapter/controller/NoteController";
//ユースケースのインポート
import { SearchNotesUseCase } from "./application/usecase/SearchNotesUseCase";
import { CreateNoteUseCase } from "./application/usecase/CreateNoteUseCase";
import { FindNoteUseCase } from "./application/usecase/FindNoteUseCase";
import { UpdateNoteUseCase } from "./application/usecase/UpdateNoteUseCase";
import { DeleteNoteUseCase } from "./application/usecase/DeleteNoteUseCase";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ユースケースのインスタンスを作成
const searchNotesUseCase = new SearchNotesUseCase();
const createNoteUseCase = new CreateNoteUseCase();
const findNoteUseCase = new FindNoteUseCase();
const updateNoteUseCase = new UpdateNoteUseCase();
const deleteNoteUseCase = new DeleteNoteUseCase();

// コントローラーにユースケースを注入
const noteController = new NoteController(
  searchNotesUseCase,
  createNoteUseCase,
  findNoteUseCase,
  updateNoteUseCase,
  deleteNoteUseCase
);

app.get("/api/notes", (req, res) => noteController.getNotes(req, res));
app.get("/api/notes/:id", (req, res) =>
  noteController.getNoteDetails(req, res)
);
app.post("/api/notes", (req, res) => noteController.createNote(req, res));
app.put("/api/notes/:id", (req, res) => noteController.updateNote(req, res));
app.delete("/api/notes/:id", (req, res) => noteController.deleteNote(req, res));

//依存性の注入

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
