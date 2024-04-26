import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes',
  standalone: true,
})
export class BytesSizePipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 2): string | null {
    if (value == null || value !== value) {
      return null;
    }

    const k = 1000;
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB'];
    if (value === 0) {
      return `0 ${sizes[0]}`;
    }

    decimals = Math.max(decimals, 0);
    const base = Math.floor(Math.log(value) / Math.log(k));
    const factor = parseFloat((value / Math.pow(k, base)).toFixed(decimals));

    return `${factor} ${sizes[base]}`;
  }
}
