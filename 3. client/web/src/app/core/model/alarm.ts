import {Serializable} from "../helper/serializable";
import {IModel} from "./interface";

export class Alarm extends Serializable implements IModel {
  _id: string;
  _u: string;
  _f: any = {
    _id: '',
    name: ''
  };
  msg: string;
  type: string;
  date: Date = new Date();

  constructor(
    _id?: string,
    _u?: string,
    _f?: any,
    msg?: string,
    type?: string,
    date?: Date
  ) {
    super();
  }

  toObject(): object {
    return {
      _id: this._id,
      _u: this._u,
      _f: this._f,
      msg: this.msg,
      type: this.type,
      date: this.date
    }
  }
}
