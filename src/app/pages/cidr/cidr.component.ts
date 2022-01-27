import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FirstService } from 'src/app/services/first.service';

@Component({
  selector: 'app-cidr',
  templateUrl: './cidr.component.html',
  styleUrls: ['./cidr.component.scss']
})
export class CidrComponent implements OnInit {

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
      name: [null, [Validators.required, this.checkRegexp()]],
      ip: [null, null, null, null],
      cidr: [[[192, 168, 0, 0], 24], [this.cidrValidator()]],
      remember: [true]
    });
  }

  checkRegexp(): ValidatorFn {

    return (control) => {
      if (!control.value) {
        return;
      }
      const reg = /^[\\]+$/;
      const a = reg.test(control.value);
      console.log(`${reg}.test(${(control.value)}) return ${a}`, control.value, reg);
      if (!a) {
        return { test: true };
      }
      return null;
    };
  }

  // // 使用reverse 数组补0
  // setEffectiveBit(currentSegment: string | number, saveLen: number = 0): number {
  //   if (!currentSegment) {
  //     return 0;
  //   }

  //   if (!saveLen) {
  //     return Number(currentSegment) || 0;
  //   }

  //   const returnArray = new Array(8).fill(0);
  //   const binary = parseInt(currentSegment + '', 10).toString(2).split('').reverse();

  //   console.log(binary);

  //   binary.forEach((item, i) => {
  //     if (i >= (8 - saveLen) && item) {
  //       returnArray[i] = item;
  //     }
  //   });

  //   return parseInt(returnArray.reverse().join(''), 2);
  // }

  // // 前位补0
  // setEffectiveBit(currentSegment: string | number, saveLen: number = 0): number {
  //   if (!currentSegment) {
  //     return 0;
  //   }

  //   if (!saveLen) {
  //     return Number(currentSegment) || 0;
  //   }

  //   console.log(currentSegment, saveLen);

  //   const binary = parseInt(currentSegment + '', 10).toString(2);

  //   console.log(binary);

  //   const currentArray = new Array(8 - binary.length).fill('0').concat(binary.split(''));
  //   console.log(currentArray.join(''), currentArray.length);

  //   const returnArray = currentArray.map((bit, i) => i > saveLen - 1 ? 0 : bit);

  //   console.log(returnArray, returnArray.length);
  //   console.log(parseInt(returnArray.join(''), 2));
  //   return parseInt(returnArray.join(''), 2);
  // }

  // // 按位与 &
  // setEffectiveBit(currentSegment: string | number, saveLen: number = 0): number {
  //   if (!currentSegment) {
  //     return 0;
  //   }

  //   if (!saveLen) {
  //     return Number(currentSegment) || 0;
  //   }

  //   console.log(currentSegment, saveLen);

  //   const saveBit = new Array(8).fill(0).fill(1, 0, saveLen).join('');

  //   const saveNum = parseInt(saveBit, 2);

  //   // tslint:disable-next-line:no-bitwise
  //   const returnArray = (Number(currentSegment) & saveNum);
  //   console.log(returnArray);

  //   return returnArray;
  // }

  // // 分段判断
  // validateHostByMask(mask: string, segment: string[] | number[]): boolean {
  //   if (!/^\d*$/.test(`${mask}`)) {
  //     return false;
  //   }
  //   if (!(parseInt(mask, 10) >= 2 && parseInt(mask, 10) <= 29)) {
  //     return false;
  //   }

  //   // 4段ip
  //   const hostLen = segment.length;
  //   // 数值 掩码
  //   const maskNum = parseInt(`${mask}`, 10);
  //   // 有效位在ip值的第几个
  //   const usefulBit = maskNum % 8;
  //   // 有几段有效ip
  //   const maskLen = Math.ceil(maskNum / 8);
  //   const hostSegment = [...segment];

  //   for (let i = 0; i < hostLen; i++) {
  //     if (i + 1 > maskLen) {
  //       if (hostSegment[i] + '' !== '0') {
  //         hostSegment[i] = '0';
  //       }
  //     } else if (i + 1 === maskLen && usefulBit) {
  //       hostSegment[i] = this.setEffectiveBit(hostSegment[i], usefulBit) + '';
  //     }
  //   }
  //   if (segment.join('') !== hostSegment.join('')) {
  //     return false;
  //   }
  //   return true;
  // }

  // 集合判断
  validateHostByMask(mask: string, segment: number[]): boolean {
    if (!/^\d*$/.test(`${mask}`)) {
      return false;
    }
    if (!(parseInt(mask, 10) >= 2 && parseInt(mask, 10) <= 29)) {
      return false;
    }

    // const saveBit = new Array(31).fill(0).fill(1, 0, Number(mask) - 1).join('');
    // const unuseBit = new Array(32 - Number(mask)).fill(1).join('');
    // tslint:disable-next-line:no-bitwise
    const unuseNum = (1 << (32 - Number(mask))) - 1;

    const unuseBit = unuseNum.toString(2);

    const allBitArr = segment.map((snippet: number) => {
      const snippetBit = (snippet || 0).toString(2);
      return new Array(8 - snippetBit.length).fill('0').concat(snippetBit).join('');
    }).join('').split('');
    // allBitArr.shift();
    const segmantBit = allBitArr.join('');
    const saveSegmant = parseInt(segmantBit, 2);

    console.log(unuseBit, segmantBit);
    console.log((unuseBit + '').length, segmantBit.length);
    console.log(unuseNum, saveSegmant);

    // tslint:disable-next-line:no-bitwise
    console.log(saveSegmant & unuseNum);

    // tslint:disable-next-line:no-bitwise
    return !(saveSegmant & unuseNum);
  }

  cidrValidator(): ValidatorFn {
    return (control) => {
      const { ip, mask } = control.value;

      if (!this.validateHostByMask(mask, ip)) {
        return {
          cover: true
        };
      }
    };
  }

  ipValidator(): ValidatorFn {
    return (control) => {
      return {
        test: true
      };
    };
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
    this.firstService.open().subscribe(item => {
      this.toast.success('succes', item);
    });
  }

}
