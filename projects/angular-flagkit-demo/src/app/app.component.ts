import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FLAG_COUNTRY_ALPHA2_LOOKUP,
  FlagComponent,
  provideFlags,
} from 'angular-flagkit';
import * as flags from 'angular-flagkit/flags';
import { Iso3166Service } from './iso3166.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlagComponent],
  providers: [provideFlags({ ...flags })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular FlagKit Demo';

  readonly allCountries = inject(Iso3166Service).getData();

  constructor(
    @Inject(FLAG_COUNTRY_ALPHA2_LOOKUP)
    readonly flagLookup: Record<string, string>
  ) {}

  menuItems = [
    {
      title: 'GitHub repo',
      link: 'https://github.com/andriy-horen/angular-flagkit',
    },
    {
      title: 'NPM package',
      link: 'https://www.npmjs.com/package/angular-flagkit',
    },
    {
      title: 'FlagKit 2.0 by Bowtie',
      link: 'https://github.com/madebybowtie/FlagKit',
    },
  ];
}
