import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'common',
        pathMatch: 'full'
      },
      {
        path: 'common',
        loadChildren: () => import('./common-settings/common-settings.module').then(m => m.CommonSettingsModule)
      },
      {
        path: 'manuals',
        loadChildren: () => import('./file-manuals/file-manuals.module').then(m => m.FileManualsModule)
      },
    ]
  }
];
