import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    this.getList();
  }

  refresh(): void {
    if (this.refreshing) {
      return;
    }
    this.refreshing = true;
    this.getList().finally(() => {
      setTimeout(() => {
        this.refreshing = false;
      }, 500);
    });
  }

  getList(): Promise<any> {
    return this.homeApiService.getList()
      .then(res => {
        this.list = res;
      })
      .catch(() => {
        this.toast.error('list', 'get list error');
      });
  }

}
