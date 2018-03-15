import {AppStore} from '../../../app-store.interface';
import {createSelector} from '@ngrx/store';
import {IAccountState} from './account.state';

export const baseAccount = (state: AppStore) => state.account;

