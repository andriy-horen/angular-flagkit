import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  inject,
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

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  ngOnInit(): void {
    const svg = this.flags[this.name];
    if (svg) {
      this.elementRef.nativeElement.innerHTML = svg;
    }
  }

  @Input() name = '';

  // TODO: remove
  get shortName() {
    return this.name?.replace('Flag', '');
  }
}
