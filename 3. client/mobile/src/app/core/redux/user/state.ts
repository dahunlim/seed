import {Map, Record} from "immutable";

export interface IUserState extends Map<string, any> {
  check: any;
}

export const State = Record({
  check: {}
});
