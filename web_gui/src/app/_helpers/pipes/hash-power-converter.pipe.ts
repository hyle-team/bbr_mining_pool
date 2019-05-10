import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hashPowerConverter'
})
export class HashPowerConverterPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const PT = 1000000000000000; // PetaHash
    const TH = 1000000000000; // TeraHash
    const GH = 1000000000; // GigaHash
    const MH = 1000000; // MegaHash
    const KH = 1000; // KiloHash
    if (value && !isNaN(value)) {
      if (value >= PT) {
        return (value / PT).toFixed(3) + ' ' + ((args === 'speed') ? 'PT/s' : 'P');
      } else if (value >= TH) {
        return (value / TH).toFixed(3) + ' ' + ((args === 'speed') ? 'TH/s' : 'T');
      } else if (value >= GH) {
        return (value / GH).toFixed(3) + ' ' + ((args === 'speed') ? 'GH/s' : 'G');
      } else if (value >= MH) {
        return (value / MH).toFixed(3) + ' ' + ((args === 'speed') ? 'MH/s' : 'M');
      } else if (value >= KH) {
        return (value / KH).toFixed(3) + ' ' + ((args === 'speed') ? 'KH/s' : 'K');
      } else {
        return value + ' ' + ((args === 'speed') ? 'H/s' : 'H');
      }
    } else if (value === 0) {
      return value + ' ' + ((args === 'speed') ? 'H/s' : 'H');
    }
  }
}
