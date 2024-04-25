import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BytesSizePipe } from '../bytes-size.pipe';
import { ImageSizeDirective } from '../image-size.directive';

@Component({
  selector: 'app-image-with-size',
  standalone: true,
  imports: [CommonModule, BytesSizePipe],
  templateUrl: './image-with-size.component.html',
  styleUrl: './image-with-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageWithSizeComponent implements AfterViewInit {
  private readonly _cdr = inject(ChangeDetectorRef);

  size$?: Observable<number>;

  @ContentChild(ImageSizeDirective) readonly imageSize?: ImageSizeDirective;

  ngAfterViewInit(): void {
    this.size$ = this.imageSize?.sizeBytes$;
    this._cdr.markForCheck();
  }
}
