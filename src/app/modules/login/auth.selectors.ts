import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const loggedInUser = createSelector(
  selectAuthState,
  auth => auth?.user
);

export const isLoggedIn = createSelector(
  loggedInUser,
  user => !!user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
