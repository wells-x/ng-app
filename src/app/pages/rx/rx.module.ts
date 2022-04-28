import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxComponent } from './rx.component';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  {
    path: '',
    component: RxComponent,
  }
];

@NgModule({
  declarations: [
    RxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    RxComponent,
  ],
})
export class RxModule { }
