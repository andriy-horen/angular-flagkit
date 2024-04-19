import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-flag',
  standalone: true,
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {}
