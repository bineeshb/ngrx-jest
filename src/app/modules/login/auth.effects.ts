import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { tap } from 'rxjs';

@Injectable()
export class AuthEffects {

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.login),
      tap(action => localStorage.setItem('user',
          JSON.stringify(action.user)))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.logout),
      tap(() => localStorage.removeItem('user'))
    ),
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions) {}
}
