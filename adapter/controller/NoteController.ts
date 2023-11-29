import { Request, Response } from "express";
import { GetNotesUseCase } from "../../application/usecase/GetNotesUseCase";
import { GetNotesRequest } from "../transfer/request/GetNotesRequest";
import { GetNotesResponse } from "../transfer/response/GetNotesResponse";
import { handleErrors } from "./errors/handleErrors";
import { HTTP_STATUS_CODES } from "./httpStatus/HTTP_STATUS_CODES";

export class NoteController {
  getNotesUseCase = new GetNotesUseCase();

  async getNotes(req: Request, res: Response) {
    try {
      //requestでバリデーション
      const request = new GetNotesRequest(
        parseInt(req.query.limit as string) || 50,
        parseInt(req.query.offset as string) || 0
      );
      request.validate();

      //ユースケースに渡す
      const output = await this.getNotesUseCase.getNotes(
        request.limit,
        request.offset
      );

      //total取得
      const total = await this.getNotesUseCase;

      //responseで整形して返却
      const response = new GetNotesResponse(output.notes, output.total);
      res.status(HTTP_STATUS_CODES.OK).json(response.convertToJson());
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
