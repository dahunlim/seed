import {Action} from '@ngrx/store';

export const GO = '[Router] Go';
export class Go implements Action {
  readonly type = GO;
  constructor(public pageName: string, public data?: any) {}
}

export const BACK = '[Router] Back';
export class Back implements Action {
  readonly type = BACK;
}

export const FORWARD = '[Router] Forward';
export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions =
  Go |
  Back |
  Forward;