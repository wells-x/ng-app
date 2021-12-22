import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxComponent } from './rx.component';

describe('RxComponent', () => {
  let component: RxComponent;
  let fixture: ComponentFixture<RxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxComponent);
    component = fixture.componentInstance;
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', (e) => {
    console.log('----------------------------------------------------------------------');
    console.log(expect(component).toBeTruthy());
    expect(component).toBeTruthy();
    console.log('----------------------------------------------------------------------');
  }, 50000);
});
