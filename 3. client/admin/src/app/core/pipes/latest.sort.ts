import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'latest'})
export class LatestSort implements PipeTransform {
  transform(array: Array<any>, args: string[]): Array<any> {
    array.sort((a: any, b: any) => {
      if (a.date.getTime() < b.date.getTime()) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }
}
