import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FirstService } from 'src/app/services/first.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  validateForm!: FormGroup;
  name = 'first page';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: NzNotificationService,
    private firstService: FirstService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  goSecond(): void {
    this.router.navigate(['/second-component'], { queryParams: { name: this.name } });
  }
  submitForm(): void {
    console.log(this.validateForm);
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm);
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
      console.log(item);
      this.toast.success('succes', item);
    });
  }
}
