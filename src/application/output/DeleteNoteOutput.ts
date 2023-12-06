import { Note } from "../../domain/entity/Note";

export class DeleteNoteOutput {
  constructor(readonly item: Note | null) {}
}
