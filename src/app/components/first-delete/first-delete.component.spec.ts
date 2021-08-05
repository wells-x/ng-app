import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDeleteComponent } from './first-delete.component';

describe('FirstDeleteComponent', () => {
  let component: FirstDeleteComponent;
  let fixture: ComponentFixture<FirstDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
