import {Map, Record, List} from 'immutable';
import {Login} from '../../../core/model/login';

export interface IAccountState extends Map<string, any> {
  isAuthenticated: boolean,
  code: number,
  isLogined: number,
  isChecked: boolean,
  login: Login;
  accountList: Login
}

export const AccountState = Record({
  isAuthenticated: false,
  code: null,
  isLogined: '',
  isChecked: false,
  login: null,
  accountList: null
});
