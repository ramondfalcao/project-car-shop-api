import { ICar, CarZod } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

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
}

export default CarService;