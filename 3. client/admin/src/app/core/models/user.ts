import {IModel} from './interface';
import {ImageSrc} from '../../shared/directives/aws-src/aws-src.directive';
import {Serializable} from '../helpers/serializable';

export enum USER_LEVEL {
  ADMIN = 9,
  STAFF = 8,
  MANAGER = 5,
  INSTRUCTOR = 1
}

export class User extends Serializable implements IModel {
  _id: string;
  manager: { _id: string, name: string };
  name: string;
  profile: ImageSrc;
  gender: string;
  birth: Date;
  tel: string;
  phone: string;
  nation: string;
  language: string;
  address: string;
  contract: number;
  payment: number;
  comment: string;
  education: string;
  graduated: string;
  major: string;
  teaching_level: number;
  experience: string;
  hour: string;
  reviews: { contents: string, date: Date }[];
  level: USER_LEVEL;
  date: Date;

  constructor(_id?: string,
              manager?: { _id: string, name: string },
              name?: string,
              profile?: ImageSrc,
              gender?: string,
              birth?: Date,
              tel?: string,
              phone?: string,
              nation?: string,
              language?: string,
              address?: string,
              contract?: number,
              payment?: number,
              comment?: string,
              education?: string,
              graduated?: string,
              major?: string,
              teaching_level?: number,
              experience?: string,
              hour?: string,
              reviews?: { contents: string, date: Date }[],
              level?: USER_LEVEL,
              date?: Date) {
    super();
    this._id = _id;
    this.name = name;
    this.profile = profile;
    this.gender = gender;
    this.birth = birth;
    this.tel = tel;
    this.phone = phone;
    this.nation = nation;
    this.language = language;
    this.address = address;
    this.contract = contract;
    this.payment = payment;
    this.comment = comment;
    this.education = education;
    this.graduated = graduated;
    this.major = major;
    this.teaching_level = teaching_level;
    this.experience = experience;
    this.hour = hour;
    this.level = level;
    this.date = date;
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

  getLevel() {
    let userLevel = '';
    switch (this.level) {
      case USER_LEVEL.ADMIN: userLevel = 'ADMIN';
        break;
      case USER_LEVEL.STAFF: userLevel = 'STAFF';
        break;
      case USER_LEVEL.MANAGER: userLevel = 'MANAGER';
        break;
      case USER_LEVEL.INSTRUCTOR: userLevel = 'INSTRUCTOR';
        break;
      default: userLevel = 'NULL';
    }
    return userLevel;
  }

  getState() {
    return 'State';
  }

  toObject(): object {
    return {
      _id: this._id,
      name: this.name,
      profile: this.profile,
      gender: this.gender,
      birth: this.birth,
      tel: this.tel,
      phone: this.phone,
      nation: this.nation,
      language: this.language,
      address: this.address,
      contract: this.contract,
      payment: this.payment,
      comment: this.comment,
      education: this.education,
      graduated: this.graduated,
      major: this.major,
      teaching_level: this.teaching_level,
      experience: this.experience,
      hour: this.hour,
      level: this.level,
      date: this.date
    };
  }
}
