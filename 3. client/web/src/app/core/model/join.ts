import {IModel} from "./interface";

export class Join implements IModel {
  _id: string;
  pass: string;
  phone: string;
  company: string;
  postcode: string;
  address: string;
  manager: string;

  // (*Title , *Question, Answer?, Id?, User?, Date?, State?)
  // state 없을시 상태 미답
  constructor (
    _id?: string,
    pass?: string,
    phone?: string,
    company?: string,
    postcode?: string,
    address?: string,
    manager?: string
  ) { }

  toObject(): object {
    return {

    }
  }
}
