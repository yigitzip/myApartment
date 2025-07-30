import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tlCurrency',
  standalone: false
})
export class TlCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    return `${value} ₺`;
  }
}
