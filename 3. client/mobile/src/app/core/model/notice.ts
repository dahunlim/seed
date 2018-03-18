import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export class Notice extends Serializable implements IModel {
  _id: string = '';
  _u: string = '';
  title: string = '';
  contents: string = '';
  file: string | File = null;
  link: string = '';
  date: Date = new Date();

  constructor(
    title?: string,
    contents?: string,
    file?: string | File,
    link?: string,
    _id?: string,
    _u?: string,
    date?: Date
  ) {
    super();

    this.title =  title;
    this.contents =  contents;
    this.file =  file;
    this.link =  link;
    this._id =  _id;
    this._u =  _u;
    this.date =  date;
  }

  toObject(): object {
    return {
      title: this.title,
      contents: this.contents,
      file: this.file,
      link: this.link
    };
  }
}
