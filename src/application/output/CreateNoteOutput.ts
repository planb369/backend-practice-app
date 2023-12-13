import { Note } from "../../domain/entity/Note";

export class CreateNoteOutput {
  constructor(readonly item: Note | null) {}
}
