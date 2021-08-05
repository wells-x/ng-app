import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout.component';
import { FirstComponent } from './pages/first/first.component';
import { SecondComponent } from './pages/second/second.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FirstDeleteComponent } from './components/first-delete/first-delete.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginComponent } from './pages/login/login.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(zh);

const routers: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'second',
        component: SecondComponent,
      },
      {
        path: 'first',
        component: SecondComponent,
      },
    ]
  },
];



@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    FirstDeleteComponent,
    SecondComponent,
    LayoutComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routers),
    FormsModule,
    HttpClientModule,
    NzFormModule,
    NzModalModule,
    NzInputModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
