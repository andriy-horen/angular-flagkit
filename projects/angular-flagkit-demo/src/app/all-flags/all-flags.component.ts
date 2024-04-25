import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FLAG_COUNTRY_ALPHA2_LOOKUP,
  FlagComponent,
  provideFlags,
} from 'angular-flagkit';
import * as flags from 'angular-flagkit/flags';
import { FlagName } from 'angular-flagkit/flags';
import { interval, map } from 'rxjs';
import {
  FlagPreview,
  FlagPreviewComponent,
} from '../flag-preview/flag-preview.component';
import {
  FlagsDataService,
  Iso3166Country,
  SpecialFlag,
} from '../flags-data.service';

@Component({
  selector: 'app-all-flags',
  standalone: true,
  imports: [CommonModule, FlagPreviewComponent, FlagComponent],
  providers: [provideFlags({ ...flags })],
  templateUrl: './all-flags.component.html',
  styleUrl: './all-flags.component.scss',
})
export class AllFlagsComponent {
  private readonly flagsData = inject(FlagsDataService);
  readonly flagLookup = inject<Record<string, string>>(
    FLAG_COUNTRY_ALPHA2_LOOKUP,
  );

  readonly allCountries = this.flagsData.getIso3166Data();
  readonly specialFlags = this.flagsData.getSpecialFlags();

  readonly interval$ = interval(1000).pipe(
    map((_, index) => (index % 2 === 0 ? 'uaFlag' : 'qqFlag')),
  );

  isoFlagPreviewAdapter(country: Iso3166Country): FlagPreview {
    return {
      title: `${country.name}`,
      flagName: this.flagLookup[country.alpha2] as FlagName,
    };
  }

  specialFlagPreviewAdapter(flag: SpecialFlag): FlagPreview {
    return {
      title: flag.displayName,
      flagName: flag.name,
    };
  }
}
