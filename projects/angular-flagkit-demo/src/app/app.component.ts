import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FLAG_COUNTRY_ALPHA2_LOOKUP, provideFlags } from 'angular-flagkit';
import * as flags from 'angular-flagkit/flags';
import {
  FlagPreview,
  FlagPreviewComponent,
} from './flag-preview/flag-preview.component';
import {
  FlagsDataService,
  Iso3166Country,
  SpecialFlag,
} from './flags-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlagPreviewComponent],
  providers: [provideFlags({ ...flags })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular FlagKit Demo';

  private readonly flagsData = inject(FlagsDataService);

  readonly allCountries = this.flagsData.getIso3166Data();
  readonly specialFlags = this.flagsData.getSpecialFlags();

  constructor(
    @Inject(FLAG_COUNTRY_ALPHA2_LOOKUP)
    private readonly flagLookup: Record<string, string>
  ) {}

  isoPreviewAdapter(country: Iso3166Country): FlagPreview {
    return {
      title: country.name,
      flagName: this.flagLookup[country.alpha2] as flags.FlagName,
      tags: [country.alpha2, country.alpha3, country.numeric.toString()],
    };
  }

  specialPreviewAdapter(flag: SpecialFlag): FlagPreview {
    return {
      title: flag.displayName,
      flagName: flag.name,
      tags: [],
    };
  }

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
