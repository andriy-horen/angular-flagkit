import { InjectionToken, Provider, inject } from '@angular/core';

export interface FlagsGlobalConfig {
  /**
   * Defines the height of a flag; flag ratio is 7:5
   * @default 15px
   */
  size: string;

  /**
   * Show the fallback flag when a requested flag wasn't found.
   * @default true
   */
  showFallbackFlag: boolean;
}

const defaultConfig: FlagsGlobalConfig = {
  size: '15px',
  showFallbackFlag: true,
};

export const FLAGS_CONFIG_TOKEN = new InjectionToken<FlagsGlobalConfig>(
  'FLAGS_CONFIG_TOKEN'
);

export function provideFlagsGlobalConfig(
  config: Partial<FlagsGlobalConfig>
): Provider[] {
  return [
    {
      provide: FLAGS_CONFIG_TOKEN,
      useValue: { ...defaultConfig, ...config },
    },
  ];
}

export function injectFlagsConfig(): FlagsGlobalConfig {
  return inject(FLAGS_CONFIG_TOKEN, { optional: true }) ?? defaultConfig;
}
