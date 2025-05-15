import { createReducer, on } from '@ngrx/store';

import { LoggedInUser } from 'app/interfaces';
import { authActions } from '../auth.actions';

export interface AuthState {
  user: LoggedInUser | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  on(authActions.login, (state, action) => ({
    user: action.user
  })),

  on(authActions.logout, (state, action) => ({
    user: undefined
  }))
);
