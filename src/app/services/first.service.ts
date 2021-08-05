import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { FirstDeleteComponent } from '../components/first-delete/first-delete.component';

@Injectable({
  providedIn: 'root'
})
export class FirstService {

  constructor(
    private modal: NzModalService
  ) { }

  open(): Observable<string> {
    const model = this.modal.create({
      nzTitle: 'ssdfa',
      nzContent: FirstDeleteComponent,
      nzOnOk: async (item) => {
        console.log(item);
        return 'sss';
      }
    });
    return model.afterClose;
  }
}
