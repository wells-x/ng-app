import { Injectable } from '@angular/core';
import { HomeData } from 'src/app/models/back-end/home';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor() { }

  getList(): Promise<HomeData[]> {
    return new Promise((resolve, reject) => {
      const isError = Math.random() > 0.8;
      setTimeout(() => {
        const list: HomeData[] = new Array(12).fill({}, 1.2).map((item, i) => {
          return { ...item, name: '', id: i + 1 };
        });
        (isError) ? reject(list) : resolve(list);
      }, 500 + Math.random() * 5000);
    });
  }
}
