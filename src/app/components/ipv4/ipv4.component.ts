import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgControl } from '@angular/forms';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ipv4',
  templateUrl: './ipv4.component.html',
  styleUrls: ['./ipv4.component.scss']
})
export class Ipv4Component implements OnInit, OnChanges, OnDestroy {

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

  value: [number, number, number, number];
  change: (value: [number, number, number, number]) => void;
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

  get ipControl(): FormArray {
    return this.formGroup.get('ip') as FormArray;
  }

  ngOnInit(): void {
    // this.ngControl.valueAccessor = this;
    const ip = this.value || [];
    this.formGroup = this.formBuilder.group({
      ip: this.formBuilder.array([
        [ip[0], []],
        [ip[1], []],
        [ip[2], []],
        [ip[3], []]
      ])
    });
    // this.ngControl.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });
    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          const value = this.ipControl.getRawValue() as [number, number, number, number];

          if (this.ipControl.invalid) {
            this.change(null);
          } else {
            this.change(value);
          }
        })
      )
      .subscribe();

    this.document.addEventListener('scroll', this.onScroll, true);
  }

  ngOnChanges(changes): void {
    const { disabledItems } = changes;

    if (disabledItems) {
      this.updateDisabledState();
    }

  }

  updateDisabledState(): void {
    if (this.formGroup) {
      this.ipControl.controls.forEach((control, index) => {
        if (this.disabledItems && this.disabledItems[index]) {
          control.disable();
        } else {
          control.enable();
        }
      });
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.formGroup) {
      this.formGroup.patchValue({ ip: obj || [] });
    }
  }

  textInput(controlItem: FormControl, index: number): void {
    const value = controlItem.value;
    const hasPoint = value.includes('.');
    const submitValue = Number.parseInt(value + '', 0) || 0;
    this.value[index] = submitValue;
    this.writeValue(this.value);
    if (hasPoint) {
      this.toNextInput(index);
    }
    console.log((submitValue + ''));
    if ((submitValue + '').length >= 3) {
      this.toNextInput(index);
    }
  }

  toNextInput(index: number): void {
    if (index >= 3) {
      return;
    }
    const nextInput: HTMLInputElement | null = document.querySelectorAll(`.ipv4-control input`)[index + 1] as HTMLInputElement;
    nextInput?.focus({ preventScroll: true });
    nextInput?.select();
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  updateTooltip(control: FormControl, tooltip: NzTooltipDirective): void {
    control.updateValueAndValidity();
    this.focusTooltip = tooltip;
    this.focusControl = control;
  }

  onScroll = () => {
    this.tooltips.forEach(item => {
      item.updatePosition();
    });
  }
  ngOnDestroy(): void {
    this.tooltipsSubscription.unsubscribe();
    this.document.removeEventListener('scroll', this.onScroll, true);
  }
}
