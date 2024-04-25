import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

export type FlagsPackageName =
  | 'svg-country-flags'
  | 'flag-icons'
  | 'flagpack-core'
  | 'country-flag-icons';

@Directive({
  selector: '[appFlagSrc]',
  standalone: true,
})
export class FlagSrcDirective implements OnInit {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() countryCode!: string;
  @Input() packageName!: FlagsPackageName;

  ngOnInit(): void {
    const url = this.buildUrl(this.countryCode, this.packageName);

    this.renderer.setAttribute(this.elementRef.nativeElement, 'src', url);
  }

  private buildUrl(alpha2: string, npmPackage: FlagsPackageName): string {
    const countryCode = this.countryCodeTransform(alpha2, npmPackage);

    return `assets/${npmPackage}/${countryCode}.svg`;
  }

  private countryCodeTransform(alpha2: string, npmPackage: FlagsPackageName) {
    if (npmPackage === 'flagpack-core') {
      return alpha2.toUpperCase();
    }

    if (npmPackage === 'country-flag-icons') {
      return alpha2.toUpperCase();
    }

    return alpha2.toLocaleLowerCase();
  }

  @HostListener('error') onError() {
    const fallbackUrl = 'assets/fallback-flag.svg';

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'src',
      fallbackUrl,
    );
  }
}
