export abstract class Serializable {

  abstract customDeserializer (key: string, value: any): any;

  fromJson(source: any, json: any): any {
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (typeof json[key] === 'object') {
          if (Array.isArray(json[key])) {
            source[key] = [];
            for (let i = 0; i < json[key].length; i++) {
              if (typeof json[key][i] === 'object') {
                source[key].push(this.fromJson({}, json[key][i]));
              } else {
                source[key].push(this.customDeserializer(key, json[key][i]));
              }
            }
          } else {
            source[key] = this.fromJson({}, json[key]);
          }
        } else {
          source[key] = this.customDeserializer(key, json[key]);
        }
      }
    }
    return source;
  }
}
