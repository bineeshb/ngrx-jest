import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { finalize, first, Observable, tap } from 'rxjs';
import { postsActions } from './posts.actions';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<any> {

  private loading = false;

  constructor(private readonly store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(postsActions.loadPostsList());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
