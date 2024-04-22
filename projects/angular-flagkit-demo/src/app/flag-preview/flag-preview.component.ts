import { Component, Input } from '@angular/core';
import { FlagComponent } from 'angular-flagkit';
import { FlagName } from 'angular-flagkit/flags';

export interface FlagPreview {
  title: string;
  flagName: FlagName;
}

@Component({
  selector: 'app-flag-preview',
  standalone: true,
  imports: [FlagComponent],
  templateUrl: './flag-preview.component.html',
  styleUrl: './flag-preview.component.scss',
})
export class FlagPreviewComponent {
  @Input() flagPreview!: FlagPreview;
}
