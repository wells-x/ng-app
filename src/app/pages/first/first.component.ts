import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FirstService } from 'src/app/services/first.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: NzNotificationService,
    private firstService: FirstService,
  ) { }

  get ipControl(): FormArray {
    return this.validateForm.get('ip') as FormArray;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      ip: [[1, 1, 1, 1], []],
      remember: [true]
    });
  }

  goSecond(): void {
    this.router.navigate(['/second-component'], { queryParams: { name: '' } });
  }
  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status !== 'VALID') { return; }
    this.doLogin();
  }
  doLogin(): void {
    console.group('--------- api start ----------');
    console.log(this.validateForm.value);
    console.log('--------- api end ----------');
    console.groupEnd();
    // const toast = new NzNotificationService(new NzSingletonService(), new Overlay, new Injector);
    console.log(this.toast);

    // NzNotificationService.success('title', 'sdf');
    // NzNotificationService.success('title', 'content');
    // this.goSecond();
    this.firstService.open().subscribe(item => {
      this.toast.success('succes', item);
    });
  }
}
