import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { PostsList } from 'app/interfaces';
import { AppState } from 'app/reducers';
import { PostsService } from 'app/services';
import { loggedInUser } from '../login/auth.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsList$: Observable<PostsList> | null = null;
  routeUrl = '';
  title = 'Posts';

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    router: Router,
    private readonly store: Store<AppState>
  ) {
    this.routeUrl = router.url;
  }

  ngOnInit(): void {
    const routeData = this.route.snapshot.data ?? null;
    this.title = routeData?.['title'] ?? 'Posts';
    this.store.select(loggedInUser).pipe(take(1))
      .subscribe(user => {
        this.postsList$ = (routeData?.['showUserPosts'] && user?.id)
          ? this.postsService.getUserPosts(user.id)
          : this.postsService.getPosts();
      });
  }
}
