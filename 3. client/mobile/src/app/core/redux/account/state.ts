import {Map, Record} from "immutable";

export interface IAccountState extends Map<string, any> {
  isMobileAuth: boolean,
  isAuthenticated: boolean,
  isPasswordAuth: boolean,
  address: any,
  accountList: any,
}

export const State = Record({
  isMobileAuth: false,
  isAuthenticated: false,
  isPasswordAuth: false,
  address: null,
  accountList: null,
});
