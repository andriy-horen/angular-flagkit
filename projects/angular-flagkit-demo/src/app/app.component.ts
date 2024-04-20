import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlagComponent, provideFlags } from 'angular-flagkit';
import { czFlag, plFlag, saFlag, usFlag } from 'angular-flagkit/flags';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlagComponent],
  providers: [provideFlags({ plFlag, czFlag, usFlag, saFlag })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular FlagKit Demo';

  constructor() {}

  menuItems = [
    {
      title: 'GitHub repo',
      link: 'https://github.com/andriy-horen/angular-flagkit',
    },
    {
      title: 'NPM package',
      link: 'https://www.npmjs.com/package/angular-flagkit',
    },
    {
      title: 'FlagKit 2.0 by Bowtie',
      link: 'https://github.com/madebybowtie/FlagKit',
    },
  ];
}
