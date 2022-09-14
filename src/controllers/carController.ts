import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request, 
    res: Response<ICar>,
  ) {
    const car = req.body;
    const result = await this._service.create(car);
    return res.status(201).json(result);
  }

  public async read(
    _req: Request, 
    res: Response<ICar[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result as ICar[]);
  }
}