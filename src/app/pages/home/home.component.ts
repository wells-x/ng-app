import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HomeData } from 'src/app/models/back-end/home';
import { HomeApiService } from 'src/app/services/home/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  text = 'title';
  refreshing = false;
  list: HomeData[] = [];

  constructor(
    private toast: NzNotificationService,
    private homeApiService: HomeApiService
  ) { }

  ngOnInit(): void {
    this.getList().subscribe();
  }

  refresh(): void {
    if (this.refreshing) {
      return;
    }
    this.refreshing = true;
    // this.getList().finally(() => {
    //   setTimeout(() => {
    //     this.refreshing = false;
    //   }, 500);
    // });
    this.getList().subscribe(() => {
      this.refreshing = false;
    });
  }

  getList(): Observable<any> {
    return this.homeApiService.getList()
      .pipe(
        map((list) => {
          return list.map(item => {
            return { ...item, };
          });
        }),
        tap(res => {
          this.list = res;
        })
      );
  }

}
