import {inject, Pipe, PipeTransform} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {TranslateService} from '@ngx-translate/core';

registerLocaleData(localeEn);

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {
  private _translateService: TranslateService = inject(TranslateService);

  transform(value: Date | string, pattern: string): string | null {
    const datePipe: DatePipe = new DatePipe(this._translateService.getCurrentLang());
    return datePipe.transform(value, pattern);
  }
}
