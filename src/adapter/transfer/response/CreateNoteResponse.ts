import { CreateNoteOutput } from "../../../application/output/CreateNoteOutput";

export class CreateNoteResponse {
  readonly id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  constructor(output: CreateNoteOutput) {
    this.id = output.item?.id?.value;
    this.title = output.item?.title?.value;
    this.content = output.item?.content?.value;
    this.createdAt = output.item?.createdAt?.value;
    this.updatedAt = output.item?.updatedAt?.value;
  }
}
