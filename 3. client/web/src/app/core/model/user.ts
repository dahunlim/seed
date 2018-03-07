import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export enum UserLevel {
  NORMAL = 1,
  MANAGER = 2,
  SUPER = 9
}

export class User extends Serializable implements IModel {
  _id: string;
  pass: string = undefined;
  company: string;
  name: string = undefined;
  phone: string;
  manager: string;
  bnumber: number;
  postcode: string;
  address: string;
  level: number;

  constructor(
    _id?: string,
    pass?: string,
    company?: string,
    name?: string,
    phone?: string,
    manager?: string,
    bnumber?: number,
    postcode?: string,
    address?: string,
    level?: number,

  ) {
    super();
  }

  toObject(): object {
    return {
      _id: this._id,
      pass: this.pass,
      company: this.company,
      name: this.name,
      phone: this.phone,
      manager: this.manager,
      bnumber: this.bnumber,
      postcode: this.postcode,
      address: this.address,
      level: this.level,
    }
  }
}

