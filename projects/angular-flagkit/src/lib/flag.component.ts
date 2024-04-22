import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { injectFlagsConfig } from './providers/flags-config.provider';
import { injectFlags } from './providers/flags.provider';

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
export class FlagComponent implements OnInit {
  readonly flags = injectFlags();
  readonly config = injectFlagsConfig();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string,
    @Attribute('aria-label') ariaLabel: string
  ) {
    if (!ariaHidden) {
      this.elementRef.nativeElement.setAttribute(
        'aria-hidden',
        this.config.ariaHidden.toString()
      );
    }
    if (!ariaLabel && !this.config.ariaHidden) {
      this.elementRef.nativeElement.setAttribute(
        'aria-label',
        'Flag of Zimbabwe'
      );
    }
  }

  ngOnInit(): void {
    const svg = this.flags[this.name];
    if (svg) {
      this.elementRef.nativeElement.innerHTML = svg;
    }
  }

  @Input() name = '';

  // TODO: remove
  get shortName() {
    return this.name.replace('Flag', '');
  }
}
