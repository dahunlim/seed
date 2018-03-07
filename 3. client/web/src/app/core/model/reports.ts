import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export class Reports extends Serializable implements IModel {
  _id: string;
  _f: string;
  reports: any = {
    temperature: 0,
    pan: true,
    heater: false,
    comp: true,
    energy: {
      heater: 0,
      pan: 0,
      comp: 0
    }
  };
  date: Date = new Date();

  constructor(
    _id?: string,
    _f?: string,
    reports?: any,
    date?: Date
  ) {
    super();
  }

  toObject(): object {
    return {
      _id: this._id,
      _f: this._f,
      reports: this.reports,
      date: this.date
    };
  }

}
