import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { PostsEffect } from './posts.effect';
import { PostsComponent } from './posts.component';

const routes: Routes = [{
  path: '',
  component: PostsComponent
}];

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PostsEffect])
  ]
})
export class PostsModule { }
