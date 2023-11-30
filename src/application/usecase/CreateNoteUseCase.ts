// import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
// import { Note } from "../../domain/entity/Note";

// export class CreateNoteUseCase {
//   async createNote(title: string, content: string): Promise<Note | null> {
//     const note = new Note();
//     note.title = title;
//     note.content = content;

//     const id = await NoteRepository.saveNote(note);

//     //idからデータを取得
//     return await NoteRepository.findNote(id);
//   }
// }
