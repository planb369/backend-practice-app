import { Title } from "../object/Title";
import { Content } from "../object/Content";

//データ投稿するときの型
export class InputDatas {
  readonly title: Title;
  readonly content: Content;

  constructor(title: Title, content: Content) {
    this.title = title;
    this.content = content;
  }
}
