import { createAction, props } from '@ngrx/store';
import { LoggedInUser } from 'app/interfaces';

const login = createAction(
  '[Login Page] User Login',
  props<{ user: LoggedInUser }>()
);

const logout = createAction(
  '[Top Menu] Logout'
);

export const authActions = {
  login,
  logout
};
