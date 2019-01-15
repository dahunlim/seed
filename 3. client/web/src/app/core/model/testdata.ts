import {IModel} from './interface';
import {Serializable} from '../helper/serializable';

export class Testdata extends Serializable implements IModel {
  _id: string;
  content: string;
  title: string;

  constructor(
    _id?: string,
    content?: string,
    title?: string,
  ) {
    super();
  }

  customDeserializer(key: string, value: any): any {
    return undefined;
  }

  toObject(): object {
    return {
      _id : this._id,
      content: this.content,
      title: this.title,
    };
  }
}
