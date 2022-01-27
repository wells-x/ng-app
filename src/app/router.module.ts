import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidrComponent } from './pages/cidr/cidr.component';
import { FirstComponent } from './pages/first/first.component';
import { HomeComponent } from './pages/home/home.component';
import { RxComponent } from './pages/rx/rx.component';
import { SecondComponent } from './pages/second/second.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'second',
    component: SecondComponent,
  },
  {
    path: 'first',
    component: FirstComponent,
  },
  {
    path: 'rx',
    component: RxComponent,
  },
  {
    path: 'cidr',
    component: CidrComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


