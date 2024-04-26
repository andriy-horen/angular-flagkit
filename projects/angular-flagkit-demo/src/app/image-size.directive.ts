import { HttpClient } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

export type ImageResult = {
  blob: Blob;
  url: string;
};

@Directive({
  selector: 'img[appImageSize]',
  exportAs: 'imageSize',
  standalone: true,
})
export class ImageSizeDirective implements OnDestroy {
  private readonly _http = inject(HttpClient);
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);
  private readonly _srcSubject = new BehaviorSubject<string>('');
  private readonly _sizeSubject = new BehaviorSubject<number>(0);

  private _blobUrl: string | null = null;

  private revokeUrl() {
    URL.revokeObjectURL(this._blobUrl ?? '');
  }

  private handleNext = ({ blob, url }: ImageResult) => {
    this.revokeUrl();
    this._blobUrl = url;
    const size = blob.size;
    this._sizeSubject.next(size);

    this._renderer.setAttribute(this._elementRef.nativeElement, 'src', url);
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'data-size',
      size.toString(),
    );
  };

  private handleError = (error: any) => {
    if (error.status !== 404 || !this.fallbackUrl) {
      return;
    }
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'src',
      this.fallbackUrl,
    );
  };

  readonly sub = this._srcSubject
    .pipe(
      filter((src) => src?.length > 0),
      distinctUntilChanged(),
      switchMap((src) => this._http.get(src, { responseType: 'text' })),
      map((svgText) => {
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        return { blob, url };
      }),
    )
    .subscribe({
      next: this.handleNext,
      error: this.handleError,
    });

  @Input() set src(src: string) {
    this._srcSubject.next(src);
  }

  @Input() fallbackUrl?: string;

  get sizeBytes$() {
    return this._sizeSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.revokeUrl();
    this.sub?.unsubscribe();
  }
}
