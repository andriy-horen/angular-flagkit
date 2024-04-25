import { Component, inject } from '@angular/core';
import {
  FLAG_COUNTRY_ALPHA2_LOOKUP,
  FlagComponent,
  provideFlags,
} from 'angular-flagkit';
import * as flags from 'angular-flagkit/flags';
import { FlagSrcDirective } from '../flag-src.directive';
import { FlagsDataService } from '../flags-data.service';
import { SvgImgComponent } from '../svg-img/svg-img.component';

@Component({
  selector: 'app-flag-comparison',
  standalone: true,
  imports: [FlagComponent, SvgImgComponent, FlagSrcDirective],
  providers: [provideFlags({ ...flags })],
  templateUrl: './flag-comparison.component.html',
  styleUrl: './flag-comparison.component.scss',
})
export class FlagComparisonComponent {
  readonly countries = inject(FlagsDataService).getIso3166Data();
  readonly flagLookup = inject<Record<string, string>>(
    FLAG_COUNTRY_ALPHA2_LOOKUP,
  );
}
