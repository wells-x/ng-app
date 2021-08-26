import { Component, Input, OnInit } from '@angular/core';
// import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  text = 'title';
  list = new Array(12);

  constructor() { }

  ngOnInit(): void {
    console.log(this);
  }

}
