import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  title = 'ng-app';

  ngOnInit(): void {
    this.initPage();
  }

  initPage(): void {
    console.log(this.title);
  }

  logout(): void {
    console.log(this.title);
    this.router.navigate(['/login'], { queryParams: { name: this.title } });
  }
}
