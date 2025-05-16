import { createAction, props } from '@ngrx/store';
import { PostsList } from 'app/interfaces';

const loadPostsList = createAction('[Posts Resolver] Load Posts List');

const postsListLoaded = createAction(
  '[Load Posts Effect] Posts List Loaded',
  props<{ postsList: PostsList }>()
);

export const postsActions = {
  loadPostsList,
  postsListLoaded
};
