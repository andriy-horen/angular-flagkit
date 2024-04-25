import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

interface MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title = 'Angular FlagKit Demo';

  readonly menuItems: MenuItem[] = [
    {
      title: 'All flags',
      link: '/',
    },
    {
      title: 'Compare',
      link: '/compare',
    },
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

  isExternalLink(link: string) {
    var protocolRegexp = new RegExp('^(?:[a-z+]+:)?//', 'i');
    return protocolRegexp.test(link);
  }
}
