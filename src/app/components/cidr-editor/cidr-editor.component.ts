import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, } from '@angular/forms';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cidr-editor',
  templateUrl: './cidr-editor.component.html',
  styleUrls: ['./cidr-editor.component.scss']
})
export class CidrEditorComponent implements OnInit, OnChanges, OnDestroy {

  formGroup: FormGroup;
  focusIndex: number;

  @Input()
  errorTip: string;

  @Input()
  range: string;

  @Input()
  errorTipPrefix: string;

  @Input()
  disabledItems: [boolean, boolean, boolean, boolean];

  value: [(string | number)[], number];
  change: (value: [(string | number)[], number]) => void;
  touched: () => void;

  @ViewChildren(NzTooltipDirective)
  tooltips: QueryList<NzTooltipDirective>;
  tooltipsSubscription: Subscription;
  focusTooltip: NzTooltipDirective;
  focusControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    @Optional()
    private ngControl: NgControl,
    @Inject(DOCUMENT)
    private document: Document
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    const value = this.value || [];
    this.formGroup = this.formBuilder.group({
      ip: [value[0]],
      mask: [value[1]]
    });

    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          const v = this.formGroup.getRawValue() as [(string | number)[], number];
          this.change(v);
        })
      )
      .subscribe();

    this.document.addEventListener('scroll', this.onScroll, true);
  }

  maskInput(): void {
    const { ip, mask } = this.formGroup.getRawValue();
    this.value = [ip, mask];
  }

  ngOnChanges(changes): void {
    const { disabledItems } = changes;

    if (disabledItems) {
      this.updateDisabledState();
    }

  }

  updateDisabledState(): void {
    if (this.formGroup) {
      // this.ipControl.controls.forEach((control, index) => {
      //   if (this.disabledItems && this.disabledItems[index]) {
      //     control.disable();
      //   } else {
      //     control.enable();
      //   }
      // });
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.formGroup) {
      this.formGroup.patchValue({ ip: obj || [] });
    }
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  onScroll = () => {
    this.tooltips.forEach(item => {
      item.updatePosition();
    });
  }

  ngOnDestroy(): void {
    this.tooltipsSubscription?.unsubscribe();
    this.document.removeEventListener('scroll', this.onScroll, true);
  }
}
