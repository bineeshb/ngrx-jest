import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/services';
import { PostsResolver } from './modules/posts/posts.resolver';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('app/modules/login/login.module').then(m => m.LoginModule),
  title: 'Login'
},
{
  path: 'my-profile',
  loadChildren: () => import('app/modules/user-profile/user-profile.module').then(m => m.UserProfileModule),
  canActivate: [AuthGuard],
  title: 'My Profile'
},
{
  path: 'my-posts',
  loadChildren: () => import('app/modules/posts/posts.module').then(m => m.PostsModule),
  canActivate: [AuthGuard],
  title: 'My Posts',
  data: {
    showUserPosts: true
  }
},
{
  path: ':postId',
  loadChildren: () => import('app/modules/post-page/post-page.module').then(m => m.PostPageModule),
  title: 'Post'
},
{
  path: '',
  loadChildren: () => import('app/modules/posts/posts.module').then(m => m.PostsModule),
  title: 'Posts',
  resolve: {
    postsList: PostsResolver
  }
},
{
  path: '**', redirectTo: '', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
