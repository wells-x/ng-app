import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidrComponent } from './cidr.component';

describe('CidrComponent', () => {
  let component: CidrComponent;
  let fixture: ComponentFixture<CidrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
