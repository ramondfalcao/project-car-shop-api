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
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, obj: ICar):Promise<ICar> {
    const parsed = CarZod.parse(obj);
    const carUpdate = await this._model.update(_id, parsed);
    if (!carUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return carUpdate;
  }
}

export default CarService;