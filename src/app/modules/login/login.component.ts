import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, take, tap } from 'rxjs';

import { AppState } from 'app/reducers';
import { AuthService } from 'app/services';
import { authActions } from './auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;
  loginForm: FormGroup;
  fetching = false;

  constructor(
    private readonly authService: AuthService,
    fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    const request = this.loginForm.getRawValue();
    this.loginForm.disable();
    this.fetching = true;
    this.authService.login(request)
      .pipe(
        finalize(() => {
          this.loginForm.enable();
          this.fetching = false;
        }),
        tap(user => {
          this.store.dispatch(authActions.login({ user }));
        }),
        take(1)
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/my-posts');
        },
        error: (error: Error) => this.errorMessage = error.message
      });
  }
}
