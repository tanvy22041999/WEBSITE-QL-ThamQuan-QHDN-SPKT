import { Routes } from '@angular/router';
import { ListPostsComponent } from './list-posts/list-posts.component';

export const postsRoutes: Routes = [
  {
    path: '',
    component: ListPostsComponent
  }
];
