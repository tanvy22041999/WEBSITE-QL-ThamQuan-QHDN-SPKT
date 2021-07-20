import { Routes } from '@angular/router';

export const homePageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'banner',
        pathMatch: 'full',
      },
      {
        path: 'banner',
        loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule)
      },
      {
        path: 'side-banner',
        loadChildren: () => import('./side-banner/side-banner.module').then(m => m.SideBannerModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      }
    ]
  }
];
