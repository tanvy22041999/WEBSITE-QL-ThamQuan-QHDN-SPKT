import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListPostsComponent } from './list-posts/list-posts.component';

export const homePageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'posts/:postType',
        component: ListPostsComponent
      },
    ]
  }
];
