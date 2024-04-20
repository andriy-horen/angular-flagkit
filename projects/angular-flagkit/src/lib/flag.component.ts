import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-flag',
  standalone: true,
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  @Input() set name(name: string) {
    console.log(name);
  }
}
