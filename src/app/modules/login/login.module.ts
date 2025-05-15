import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from './reducers';
import { AuthEffects } from './auth.effects';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders<LoginModule> {
    return {
      ngModule: LoginModule,
      providers: [
        AuthEffects
      ]
    }
  }
}
