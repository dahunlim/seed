import {IModel} from './interface';
import {Serializable} from '../helpers/serializable';

export class Notice extends Serializable implements IModel {
  _id: string = '';
  title: string = '';
  contents: string = '';
  date: Date = new Date();

  constructor(title?: string, contents?: string, _id?: string, date?: Date) {
    super();
    this.title = title;
    this.contents = contents;
    this._id = _id;
    this.date = date;
  }

  toObject(): object {
    return {
      title: this.title,
      contents: this.contents
    };
  }
  customDeserializer(key: string, value: any): any {
    let result = value;
    switch (key) {
      case 'date':
        result = new Date(Date.parse(value));
        break;
    }
    return result;
  }
}
