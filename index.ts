import express from "express";
import dotenv from "dotenv";
import { NoteController } from "./src/adapter/controller/NoteController";
import { NoteRepository } from "./src/infrastructure/repository/NoteRepository";

import { FindNoteUseCase } from "./src/application/usecase/FindNoteUseCase";
import { SearchNotesUseCase } from "./src/application/usecase/SearchNotesUseCase";
import { CreateNoteUseCase } from "./src/application/usecase/CreateNoteUseCase";
import { UpdateNoteUseCase } from "./src/application/usecase/UpdateNoteUseCase";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 初期化
// --- repository ---
const noteRepository = new NoteRepository();
// --- repository ---

// --- usecase ---
const findNoteUseCase = new FindNoteUseCase(noteRepository);
const searchNotesUseCase = new SearchNotesUseCase(noteRepository);
const createNoteUseCase = new CreateNoteUseCase(noteRepository);
const updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
// --- usecase ---

// --- controller ---
const noteController = new NoteController(
  findNoteUseCase,
  searchNotesUseCase,
  createNoteUseCase,
  updateNoteUseCase
);
// --- controller ---

// --- ルーティング ---
app.get("/api/notes/:id", noteController.find.bind(noteController));
app.get("/api/notes/", noteController.search.bind(noteController));
app.post("/api/notes/", noteController.create.bind(noteController));
app.put("/api/notes/:id", noteController.update.bind(noteController));
// --- ルーティング ---

app.listen(port, () => {
  console.log("start");
});
