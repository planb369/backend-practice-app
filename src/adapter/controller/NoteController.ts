import { Request, Response } from "express";
import { handleErrors } from "./errors/handleErrors";
import { HTTP_STATUS_CODES } from "./httpStatus/HTTP_STATUS_CODES";

import { FindNoteRequest } from "../transfer/request/FindNoteRequest";
import { FindNoteInput } from "../../application/input/FindNoteInput";
import { FindNoteUseCase } from "../../application/usecase/FindNoteUseCase";
import { FindNoteResponse } from "../transfer/response/FindNoteResponse";
import { SearchNoteRequest } from "../transfer/request/SearchNotesRequest";
import { SearchNotesInput } from "../../application/input/SearchNotesInput";
import { SearchNotesUseCase } from "../../application/usecase/SearchNotesUseCase";
import { SearchNotesResponse } from "../transfer/response/SearchNotesResponse";
import { CreateNoteRequest } from "../transfer/request/CreateNoteRequest";
import { CreateNoteInput } from "../../application/input/CreateNoteInput";
import { CreateNoteUseCase } from "../../application/usecase/CreateNoteUseCase";
import { CreateNoteResponse } from "../transfer/response/CreateNoteResponse";
import { UpdateNoteRequest } from "../transfer/request/UpdateNoteRequest";
import { UpdateNoteInput } from "../../application/input/UpdateNoteInput";
import { UpdateNoteUseCase } from "../../application/usecase/UpdateNoteUseCase";
import { UpdateNoteResponse } from "../transfer/response/UpdateNoteResponse";
import { DeleteNoteRequest } from "../transfer/request/DeleteNoteRequest";
import { DeleteNoteInput } from "../../application/input/DeleteNoteInput";
import { DeleteNoteUseCase } from "../../application/usecase/DeleteNoteUseCase";
import { DeleteNoteResponse } from "../transfer/response/DeleteNoteResponse";

export class NoteController {
  constructor(
    private readonly findNoteUseCase: FindNoteUseCase,
    private readonly searchNotesUseCase: SearchNotesUseCase,
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase
  ) {}

  async find(req: Request, res: Response) {
    try {
      const request = new FindNoteRequest(req);

      const input = new FindNoteInput(request.id);
      const output = await this.findNoteUseCase.handle(input);

      const response = new FindNoteResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async search(req: Request, res: Response) {
    try {
      const request = new SearchNoteRequest(req);

      const input = new SearchNotesInput(request.limit, request.offset);
      const output = await this.searchNotesUseCase.handle(input);

      const response = new SearchNotesResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const request = new CreateNoteRequest(req);

      const input = new CreateNoteInput(request.title, request.content);
      const output = await this.createNoteUseCase.handle(input);

      const response = new CreateNoteResponse(output);
      return res.status(HTTP_STATUS_CODES.CREATED).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const request = new UpdateNoteRequest(req);

      const input = new UpdateNoteInput(
        request.id,
        request.title,
        request.content
      );
      const output = await this.updateNoteUseCase.handle(input);

      const response = new UpdateNoteResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const request = new DeleteNoteRequest(req);

      const input = new DeleteNoteInput(request.id);
      const output = await this.deleteNoteUseCase.handle(input);

      const response = new DeleteNoteResponse(output);
      return res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (err) {
      if (err instanceof Error) {
        handleErrors(err, res);
      }
    }
  }
}
