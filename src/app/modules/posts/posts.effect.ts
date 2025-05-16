import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';

import { PostsService } from 'app/services';
import { postsActions } from './posts.actions';

@Injectable()
export class PostsEffect {

  private readonly loadPostsList$ = createEffect(
    () => this.actions$.pipe(
      ofType(postsActions.loadPostsList),
      concatMap(() => this.postsService.getPosts()),
      map(postsList => postsActions.postsListLoaded({ postsList }))
    )
  );

  constructor(private readonly actions$: Actions, private readonly postsService: PostsService) {}
}
