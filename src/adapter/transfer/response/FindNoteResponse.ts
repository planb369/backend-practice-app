import { FindNoteOutput } from "../../../application/output/FindNoteOutput";

export class FindNoteResponse {
  readonly id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  constructor(output: FindNoteOutput) {
    this.id = output.item?.id?.value;
    this.content = output.item?.content;
    this.title = output.item?.title;
    this.createdAt = output.item?.createdAt;
    this.updatedAt = output.item?.updatedAt;
  }
}
