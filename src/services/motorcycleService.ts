import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { IMotorcycle, MotorcycleZod } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

class MotorCycleService implements IService<IMotorcycle> {
  private _model:IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._model = model;
  }

  public async create(obj:unknown):Promise<IMotorcycle> {
    const parsed = MotorcycleZod.parse(obj);
    return this._model.create(parsed);
  }

  public async read():Promise<IMotorcycle[]> {
    const motorcycles = await this._model.read();
    return motorcycles as IMotorcycle[];
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const motorcycle = await this._model.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id:string, obj: IMotorcycle):Promise<IMotorcycle> {
    const parsed = MotorcycleZod.parse(obj);
    const motorcycleUpdate = await this._model.update(_id, parsed);
    if (!motorcycleUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleUpdate;
  }

  public async delete(_id:string):Promise<IMotorcycle> {
    const motorcycleDelete = await this._model.delete(_id);
    if (!motorcycleDelete) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleDelete;
  }
}

export default MotorCycleService;