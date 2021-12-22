import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static getRandomStr(length: number = 6): string {
    const codes = [
      [48, 47],  // 0-9
      [97, 122], // a-z
      [65, 90]   // A-Z
    ].reduce((r, c) => {
      const [begin, end] = c;
      for (let n = begin; n <= end; n++) {
        r.push(n);
      }
      return r;
    }, new Array<number>());

    const random = [];
    for (let i = 0; i < length; i++) {
      random.push(codes[Math.floor(codes.length * Math.random())]);
    }

    return `${random.map((item) => String.fromCharCode(item)).join('')}`;
  }
}
