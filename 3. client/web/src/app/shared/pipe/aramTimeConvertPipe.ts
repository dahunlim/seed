import {Pipe, PipeTransform} from '@angular/core';
/**
 * oh
 * 2018. 02. 21.
 * */
@Pipe({
  name: 'aramConvertPipe'
})
export class AramTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    let second: any = (value - minutes * 60);
    if ((value - minutes * 60) < 10) {
      second =  '0' + second
    }
    return minutes + ':' + second;
  }
}
