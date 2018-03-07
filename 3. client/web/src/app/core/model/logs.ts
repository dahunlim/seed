import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export class Logs extends Serializable implements IModel {
  _id: string;
  temperature: number;
  pan: boolean;
  heater: boolean;
  comp: boolean;
  power_consumption: number;
  power_use: number;
  last_date: string;

  constructor(
    _id?: string,
    temperature?: number,
    pan?: boolean,
    heater?: boolean,
    comp?: boolean,
    power_consumption?: number,
    power_user?: number,
    last_date?: string
  ) {
    super();
  }

  toObject(): object {
    return {
      _id: this._id
    };
  }

}
