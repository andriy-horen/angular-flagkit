import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
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
export class ImageWithSizeComponent implements AfterContentInit {
  size$?: Observable<number>;

  @ContentChild(ImageSizeDirective) readonly imageSize?: ImageSizeDirective;

  ngAfterContentInit(): void {
    if (!this.imageSize) {
      console.error('ImageWithSizeComponent expected ImageSizeDirective child');
      return;
    }
    this.size$ = this.imageSize.sizeBytes$;
  }
}
