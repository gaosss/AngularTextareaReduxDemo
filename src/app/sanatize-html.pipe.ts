import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'sanatizeHtml'
})
export class SanatizeHtmlPipe implements PipeTransform {

  constructor(private _sanatizer: DomSanitizer) {

  }
  transform(value: string): SafeHtml {
    return this._sanatizer.bypassSecurityTrustHtml(value)  }

}
