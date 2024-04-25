import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-svg-img',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './svg-img.component.html',
  styleUrl: './svg-img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgImgComponent implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private readonly srcSubject = new BehaviorSubject<string>('');

  readonly sub = this.srcSubject
    .pipe(
      filter((src) => src?.length > 0),
      switchMap((src) => this.http.get(src, { responseType: 'text' })),
      map((svgText) => {
        const container = this.document.createElement('div');
        container.innerHTML = svgText;

        return container.querySelector('svg') as SVGElement;
      }),
    )
    .subscribe((svg) => {
      this.elementRef.nativeElement.innerHTML = '';
      this.renderer.appendChild(this.elementRef.nativeElement, svg);
    });

  @Input() set src(src: string) {
    this.srcSubject.next(src);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
