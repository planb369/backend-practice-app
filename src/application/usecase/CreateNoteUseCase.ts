import { CreateNoteInput } from "../input/CreateNoteInput";
import { CreateNoteOutput } from "../output/CreateNoteOutput";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export class CreateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {}

  async handle(input: CreateNoteInput): Promise<CreateNoteOutput> {
    const note = input.getNote();
    note.id = await this.noteRepository.save(note);

    // インスタンスメソッドを介してidからデータを取得
    const result = await this.noteRepository.find(note);
    return new CreateNoteOutput(result);
  }
}
