import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { LoggedInUser } from './interfaces';
import { AppState } from './reducers';
import { authActions } from './modules/login/auth.actions';
import { isLoggedIn, loggedInUser } from './modules/login/auth.selectors';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedInUser$: Observable<LoggedInUser | undefined> = of(undefined);
  isLoggedIn$: Observable<boolean> = of(false);

  constructor(
    public appService: AppService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      this.store.dispatch(authActions.login({ user: JSON.parse(savedUser) }));
    }

    this.loggedInUser$ = this.store.select(loggedInUser);
    this.isLoggedIn$ = this.store.select(isLoggedIn);
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
    this.router.navigateByUrl('/');
  }
}
