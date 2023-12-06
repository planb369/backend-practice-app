import { Note } from "../../domain/entity/Note";

export class UpdateNoteOutput {
  constructor(readonly item: Note | null) {}
}
