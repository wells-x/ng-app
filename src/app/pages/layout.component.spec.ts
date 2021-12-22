import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent
      ],
    }).compileComponents();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(LayoutComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'ng-app'`, () => {
  //   const fixture = TestBed.createComponent(LayoutComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ng-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(LayoutComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('ng-app app is running!');
  // });
});
