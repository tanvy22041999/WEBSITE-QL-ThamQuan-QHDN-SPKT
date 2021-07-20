import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'academic-ranks',
        pathMatch: 'full',
      },
      {
        path: 'academic-ranks',
        loadChildren: () => import('./academic-ranks/academic-ranks.module').then(m => m.AcademicRanksModule)
      },
      {
        path: 'majors',
        loadChildren: () => import('./majors/majors.module').then(m => m.MajorsModule)
      },
      {
        path: 'degree-ranks',
        loadChildren: () => import('./degree-ranks/degree-ranks.module').then(m => m.DegreeRanksModule),
      },
      {
        path: 'faculties',
        loadChildren: () => import('./faculties/faculties.module').then(m => m.FacultiesModule),
      },

      {
        path: 'research-domains',
        loadChildren: () => import('./research-domains/research-domains.module').then(m => m.ResearchDomainsModule),
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
      },
      {
        path: 'tour-times',
        loadChildren: () => import('./tour-times/tour-times.module').then(m => m.TourTimesModule),
      },
      {
        path: 'business',
        loadChildren: () => import('./business-database/business-database.module').then(m => m.BusinessDatabaseModule),
      },
      {
        path: 'vehicle',
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
      },
      {
        path: 'student-survey-questions',
        loadChildren: () => import('./student-survey-questions/student-survey-questions.module').then(m => m.StudentSurveyQuestionsModule),
      },
      {
        path: 'business-survey-questions',
        loadChildren: () => import('./business-survey-questions/business-survey-questions.module').then(m => m.BusinessSurveyQuestionsModule),
      },
      {
        path: 'guide-survey-questions',
        loadChildren: () => import('./guide-survey-questions/guide-survey-questions.module').then(m => m.GuideQuestionsModule),
      }

    ],
  },
];
