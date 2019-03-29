import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    if (value < 60) {
      result = 'a few seconds ago';
    } else {
      result = Math.floor(value / 60) + ' min ago';
    }
    return result;
  }

}
