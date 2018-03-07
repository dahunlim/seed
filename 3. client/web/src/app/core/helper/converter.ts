import {Serializable} from './serializable';
/* */
export class Converter {

  static jsonToInstance<T extends Serializable>(type: { new(): T; }, data: any) {
    let result: any = null;
    if (Array.isArray(data)) {
      result = new Array<Serializable>();
      for (let i = 0; i < data.length; i++) {
        const obj = new type();
        obj.fromJson(data[i]);
        result.push(obj);
      }
    } else {
      result = new type();
      result.fromJson(data);
    }
    return result;
  }
}
