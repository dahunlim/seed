import {Map, Record} from "immutable";

export interface IAccountState extends Map<string, any> {
  isMobileAuth: boolean,
  isAuthenticated: boolean,
  isPasswordAuth: boolean,
  address: any
}

export const AccountState = Record({
  isMobileAuth: false,
  isAuthenticated: false,
  isPasswordAuth: false,
  address: null
});
