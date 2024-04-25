import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./all-flags/all-flags.component').then(
        (m) => m.AllFlagsComponent,
      ),
  },
  {
    path: 'compare',
    loadComponent: () =>
      import('./flag-comparison/flag-comparison.component').then(
        (m) => m.FlagComparisonComponent,
      ),
  },
];
