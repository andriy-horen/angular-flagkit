import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFlags } from 'angular-flagkit';
import { euFlag, lgbtFlag, uaFlag, usFlag } from 'angular-flagkit/flags';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFlags({ uaFlag, usFlag, euFlag, lgbtFlag }),
  ],
};
