import { Request, Response } from "express";
import { GetNotesUseCase } from "../../application/usecase/GetNotesUseCase";
import { GetNotesRequest } from "../transfer/request/GetNotesRequest";
import { GetNotesResponse } from "../transfer/response/GetNotesResponse";

export class NoteController {
  getNotesUseCase = new GetNotesUseCase();

  async getNotes(req: Request, res: Response) {
    //クエリパラメータから取得してインスタンス化したバリデーションクラスに渡す
    const request = new GetNotesRequest(
      parseInt(req.query.limit as string) || 50,
      parseInt(req.query.offset as string) || 0
    );
    //バリデーション関数実行
    const validationError = request.validate();
    if (validationError) {
      //ここで本来はresponseに渡して整形してからreturnする
      return res.status(400).json({ error: validationError });
    }

    //ユースケースに渡して情報を取得
    const output = await this.getNotesUseCase.getNotes(
      request.limit,
      request.offset
    );

    //responseに渡して整形
    const response = new GetNotesResponse(output, 200, "Success");
    res.status(200).json(response.convertToJson());
  }
}
