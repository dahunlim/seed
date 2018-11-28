import {IModel} from './interface';

export class Join implements IModel {
  _id: string;
  pass: string;
  name: string;
  phone: string;

  // (*Title , *Question, Answer?, Id?, User?, Date?, State?)
  // state 없을시 상태 미답
  constructor (
    _id?: string,
    pass?: string,
    name?: string,
    phone?: string,
  ) { }

  customDeserializer(key: string, value: any): any {
    return undefined;
  }

  toObject(): object {
    return {
      _id: this._id,
      pass: this.pass,
      name: this.name,
      phone: this.phone
    }
  }
}
