import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidrEditorComponent } from './cidr-editor.component';

describe('CidrEditorComponent', () => {
  let component: CidrEditorComponent;
  let fixture: ComponentFixture<CidrEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidrEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidrEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
