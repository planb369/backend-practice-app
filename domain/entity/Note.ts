export class Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
