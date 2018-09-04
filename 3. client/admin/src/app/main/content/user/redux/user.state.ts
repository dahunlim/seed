import {Record, Map, List} from 'immutable';
import {User} from '../../../../core/models/user';
import {IModel} from '../../../../core/models/interface';

export interface IUserState extends Map<string, any> {
  list: User[];
  total: number;
  selectedUser: User;
  selectedUserDetail: Map<string, List<IModel>>;
  error: string;
}

export const UserState = Record({
  list: [],
  total: 0,
  selectedUser: null,
  selectedUserDetail: null,
  error: ''
});
