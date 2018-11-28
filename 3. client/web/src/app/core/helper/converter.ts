import {Serializable} from './serializable';
import {List} from 'immutable';


export class Converter {

  static jsonToInstance<T extends Serializable>(type: { new(): T; }, data: any): any {
    if (Array.isArray(data)) {
      const result: T[] = [];
      for (let i = 0; i < data.length; i++) {
        const obj = new type();
        obj.fromJson(obj, data[i]);
        result.push(obj);
      }
      return List<T>(result);
    } else {
      const result = new type();
      result.fromJson(result, data);
      return result;
    }
  }
}
