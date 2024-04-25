import { InjectionToken } from '@angular/core';

export type FlagsPackageName =
  | 'svg-country-flags'
  | 'flag-icons'
  | 'flagpack-core'
  | 'country-flag-icons';

export const IMAGE_BUILDERS_TOKEN = new InjectionToken<
  Record<FlagsPackageName, (alpha2: string) => string>
>('IMAGE_BUILDERS_TOKEN', {
  providedIn: 'root',
  factory: () => ({
    'svg-country-flags': (alpha2: string) =>
      `assets/svg-country-flags/${alpha2.toLowerCase()}.svg`,
    'flag-icons': (alpha2: string) =>
      `assets/flag-icons/${alpha2.toLowerCase()}.svg`,
    'flagpack-core': (alpha2: string) =>
      `assets/flagpack-core/${alpha2.toUpperCase()}.svg`,
    'country-flag-icons': (alpha2: string) =>
      `assets/country-flag-icons/${alpha2.toUpperCase()}.svg`,
  }),
});
