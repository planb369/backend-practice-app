import { Request, Response } from "express";
import { GetNotesUseCase } from "../../application/usecase/GetNotesUseCase";
import { GetNotesRequest } from "../transfer/request/GetNotesRequest";
import { GetNotesResponse } from "../transfer/response/GetNotesResponse";
import { handleErrors } from "./errors/handleErrors";

export class NoteController {
  getNotesUseCase = new GetNotesUseCase();

  async getNotes(req: Request, res: Response) {
    try {
      const request = new GetNotesRequest(
        parseInt(req.query.limit as string) || 50,
        parseInt(req.query.offset as string) || 0
      );

      const validationError = request.validate();
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const output = await this.getNotesUseCase.getNotes(
        request.limit,
        request.offset
      );

      //responseで整形して返却
      const response = new GetNotesResponse(output);
      res.status(200).json(response.convertToJson());
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
