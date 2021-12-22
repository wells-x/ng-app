import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {

  constructor() { }

  list: any[] = [
    {
      text: 'switch',
      onclick: () => {
        this.testSwitchMap();
      }
    }
  ];

  ngOnInit(): void {
  }

  testSwitchMap(): void {
    of(0, 1, 3)
      .pipe(
        switchMap((v): any => {
          return [{ text: 'mmm' }];
        })
      )
      .subscribe(v => {
        console.log(v);
      });
  }

}
