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
  name: string = undefined;
  phone: string;
  company: string;
  bnumber: number;
  postcode: string;
  address: string;
  push: boolean;
  level: number;
  manager: string;

  constructor(
    _id?: string,
    pass?: string,
    name?: string,
    phone?: string,
    company?: string,
    bnumber?: number,
    postcode?: string,
    address?: string,
    push?: boolean,
    level?: number,
    manager?: string
  ) {
    super();
    this._id = _id;
    this.pass = pass;
    this.name = name;
    this.phone = phone;
    this.company = company;
    this.bnumber = bnumber;
    this.postcode = postcode;
    this.address = address;
    this.push = push;
    this.level = level;
    this.manager = manager;
  }

  toObject(): object {
    return {
      _id: this._id,
      pass: this.pass,
      name: this.name,
      phone: this.phone,
      company: this.company,
      bnumber: this.bnumber,
      postcode: this.postcode,
      address: this.address,
      level: this.level,
      manager: this.manager
    }
  }
}

