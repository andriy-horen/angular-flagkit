import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  inject,
} from '@angular/core';
import { FlagName } from 'angular-flagkit/flags';
import { injectFlagsConfig } from './providers/flags-config.provider';
import { injectFlags } from './providers/flags.provider';

export type FlagType = FlagName | (string & {});

@Component({
  selector: 'ngx-flag',
  exportAs: 'ngxFlag',
  standalone: true,
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    class: 'ngx-flag',
    '[class]': '"ngx-flag-" + shortName',
  },
})
export class FlagComponent {
  readonly flags = injectFlags();
  readonly config = injectFlagsConfig();

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Input()
  get name() {
    return this._name;
  }
  set name(value: FlagType) {
    this._name = value;
    const svg = this.flags[this._name];
    if (svg) {
      this.elementRef.nativeElement.innerHTML = svg;
    } else if (this.config.showFallbackFlag) {
      this.elementRef.nativeElement.innerHTML =
        this.flags['fallbackFlag'] ?? '';
    }
  }
  private _name!: FlagType;

  // TODO: remove
  get shortName() {
    return this.name?.replace('Flag', '');
  }
}
