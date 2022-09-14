import { ICar, CarZod } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _model:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._model = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZod.parse(obj);
    return this._model.create(parsed);
  }

  public async read():Promise<ICar[]> {
    const cars = await this._model.read();
    return cars as ICar[];
  }

  public async readOne(_id:string):Promise<ICar> {
    const frame = await this._model.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }
}

export default CarService;