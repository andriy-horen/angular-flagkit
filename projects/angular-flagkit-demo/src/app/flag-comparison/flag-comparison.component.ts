import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FLAG_COUNTRY_ALPHA2_LOOKUP,
  FlagComponent,
  provideFlags,
} from 'angular-flagkit';
import * as flags from 'angular-flagkit/flags';
import { BytesSizePipe } from '../bytes-size.pipe';
import { FlagsDataService } from '../flags-data.service';
import { ImageSizeDirective } from '../image-size.directive';
import { ImageWithSizeComponent } from '../image-with-size/image-with-size.component';
import { IMAGE_BUILDERS_TOKEN } from './image-url-builder.service';

@Component({
  selector: 'app-flag-comparison',
  standalone: true,
  imports: [
    FlagComponent,
    ImageSizeDirective,
    ImageWithSizeComponent,
    BytesSizePipe,
  ],
  providers: [provideFlags({ ...flags })],
  templateUrl: './flag-comparison.component.html',
  styleUrl: './flag-comparison.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComparisonComponent {
  private readonly _textEncoder = new TextEncoder();

  readonly countries = inject(FlagsDataService).getIso3166Data().slice(0, 20);
  readonly flagLookup = inject<Record<string, string>>(
    FLAG_COUNTRY_ALPHA2_LOOKUP,
  );
  readonly urlBuilder = inject(IMAGE_BUILDERS_TOKEN);

  getFlagSize(flagName: string) {
    const flag =
      (flags as Record<string, string>)[flagName] ?? flags.fallbackFlag;

    return this._textEncoder.encode(flag).length;
  }
}
