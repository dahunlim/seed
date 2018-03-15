import {Pipe, PipeTransform} from '@angular/core';
/**
 * oh
 * 2018. 03. 05.
 * */
@Pipe({
  name: 'aramDatePeriodPipe'
})
export class AramDatePeriodPipe implements PipeTransform {
  transform(input: string) {
    return input.replace('AM', '오전').replace('PM', '오후');
  }
}
