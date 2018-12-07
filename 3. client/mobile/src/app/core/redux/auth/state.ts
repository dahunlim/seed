import {Map, Record} from "immutable";

export interface IAuthState extends Map<string, any> {
  result: boolean;
}

export const State = Record({
  result: false
});
