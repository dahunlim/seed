import {IModel} from "./interface";
import {Serializable} from "../helper/serializable";

export class Login extends Serializable implements IModel {
  _id: string;
  userCompany: string;
  userId: string;
  userLevel: number;
  userState: number;

  constructor(
    _id?: string,
    userCompany?: string,
    userId?: string,
    userLevel?: number,
    userState?: number
  ) {
    super();
    this._id = _id;
    this.userCompany = userCompany;
    this.userId = userId;
    this.userLevel = userLevel;
    this.userState = userState;
  }

  toObject(): object {
    return {
      _id : this._id,
      userCompany: this.userCompany,
      userId: this.userId,
      userLevel: this.userLevel,
      userState: this.userState
    };
  }
}