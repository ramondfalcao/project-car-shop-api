import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { IMotorcycle, MotorcycleZod } from '../interfaces/IMotorcycle';

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
}

export default MotorCycleService;