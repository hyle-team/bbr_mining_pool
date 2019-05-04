import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'JsonToNgFor'
})
export class JsonToNgForPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keyArr: any[] = Object.keys(value),
      dataArr = [];

    keyArr.forEach((key: any) => {
      dataArr.push(value[key]);
    });

    return dataArr;
  }
}
