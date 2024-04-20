import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { injectFlags } from './providers/flags.provider';

@Component({
  selector: 'ngx-flag',
  standalone: true,
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent implements OnInit {
  readonly flags = injectFlags();

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    console.log(this.flags);
    console.log(this.elementRef);
  }

  @Input() set name(name: string) {
    const svg = this.flags[name];
    if (svg) {
      this.elementRef.nativeElement.innerHTML = svg;
    }
  }
}
