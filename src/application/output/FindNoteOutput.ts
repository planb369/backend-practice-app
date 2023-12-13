import { Note } from "../../domain/entity/Note";

export class FindNoteOutput {
  constructor(readonly item: Note | null) {}
}
