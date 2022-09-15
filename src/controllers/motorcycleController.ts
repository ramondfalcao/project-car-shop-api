import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorCycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request, 
    res: Response<IMotorcycle>,
  ) {
    const motorcycle = req.body;
    const result = await this._service.create(motorcycle);
    return res.status(201).json(result);
  }

  public async read(
    _req: Request, 
    res: Response<IMotorcycle[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result as IMotorcycle[]);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result as IMotorcycle);
  }
}