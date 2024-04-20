import {
  InjectionToken,
  Optional,
  Provider,
  SkipSelf,
  inject,
} from '@angular/core';

export function provideFlags(flags: Record<string, string>): Provider[] {
  return [
    {
      provide: FLAGS_TOKEN,
      useFactory: (registered: Record<string, string> = {}) => ({
        ...registered,
        ...flags,
      }),
      deps: [[FLAGS_TOKEN, new Optional(), new SkipSelf()]],
    },
  ];
}

export function injectFlags(): Record<string, string> {
  return inject(FLAGS_TOKEN, { optional: true }) ?? {};
}

export const FLAGS_TOKEN = new InjectionToken<Record<string, string>>(
  'FLAGS_TOKEN'
);
