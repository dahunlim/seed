import {IModel} from "./interface";
import {Serializable} from '../helper/serializable';

export class Inquiry extends Serializable implements IModel {
  _id: string = '';
  user: any = {
    name: '',
  };
  title: string = '';
  question: string = '';
  answer: any = {
    contents: ''
  };
  file: string | File = null;
  link: string = '';
  date: Date = new Date();
  state: number;

  constructor (
    title?: string,
    question?: string,
    file?: string | File,
    link?: string,
    answer?: any,
    state?: number,
    user?: string,
    date?: Date,
    _id?: string,
  ) {
    super();

    this.title = title;
    this.question = question;
    this.file = file;
    this.link = link;
    this.answer = answer;
    this.state = state;
    this.user = user;
    this.date = date;
    this._id = _id;
  }

  toObject(): object {
    return {
      title: this.title,
      question: this.question,
      file: this.file,
      link: this.link,
      answer: this.answer
    }
  }
}
