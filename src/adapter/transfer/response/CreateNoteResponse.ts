// response/CreateNoteResponse.ts
import { CreateNoteOutput } from "../../../application/output/CreateNoteOutput";

export class CreateNoteResponse {
  readonly id;
  readonly title;
  readonly content;
  readonly createdAt;
  readonly updatedAt;

  constructor(output: CreateNoteOutput) {
    if (output.item) {
      this.id = output.item.id?.value;
      this.title = output.item.title;
      this.content = output.item.content;
      this.createdAt = output.item.createdAt;
      this.updatedAt = output.item.updatedAt;
    }
  }
}
