import { Component, OnInit } from '@angular/core';
import { of, Observable, forkJoin, interval, concat, throwError, merge, zip } from 'rxjs';
import {
  concatMap,
  switchMap,
  delay,
  map,
  bufferCount,
  tap,
  take,
  combineAll,
  concatAll,
  catchError,
  mapTo,
  mergeAll,
  pairwise,
  startWith,
  withLatestFrom
} from 'rxjs/operators';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.scss']
})
export class RxComponent implements OnInit {

  constructor() { }

  list: any[] = [
    {
      text: 'switch',
      description: '',
      onclick: () => {
        this.testSwitchMap();
      }
    },
    {
      text: 'concat',
      description: '',
      onclick: () => {
        this.testConcatMap();
      }
    },
    {
      text: 'combineAll',
      description: '',
      onclick: () => {
        this.testCombineAll();
      }
    },
    {
      text: 'concat',
      description: '当 source 永远不完成时，随后的 observables 永远不会运行',
      onclick: () => {
        this.testConcat();
      }
    },
    {
      text: 'concatAll',
      description: '按顺序订阅每个内部 obserable ，前一个完成了再订阅下一个',
      onclick: () => {
        this.testConcatAll();
      }
    },
    {
      text: 'forkJoin',
      description: '当所有 observables 完成时，将每个 observable 的最新值作为数组发出',
      onclick: () => {
        this.testForkJoin();
      }
    },
    {
      text: 'merge',
      description: '',
      onclick: () => {
        this.testMerge();
      }
    },
    {
      text: 'mergeAll',
      description: '',
      onclick: () => {
        this.testMergeAll();
      }
    },
    {
      text: 'pairwise',
      description: '',
      onclick: () => {
        this.testPairwise();
      }
    },
    {
      text: 'startWith',
      description: '以固定值开始发出',
      onclick: () => {
        this.testStartWith();
      }
    },
    {
      text: 'withLatestFrom',
      description: '',
      onclick: () => {
        this.testWithLatestFrom();
      }
    },
    {
      text: 'zip',
      description: 'zip 操作符会订阅所有内部 observables，然后等待每个发出一个值。',
      onclick: () => {
        this.testZip();
      }
    },
  ];

  ngOnInit(): void {
  }

  testSwitchMap(): void {
    of(0, 1, 3)
      .pipe(
        switchMap((v): any => {
          return [{ text: 'mmm' }];
        })
      )
      .subscribe(v => {
        console.log(v);
      });
  }

  testConcatMap(): void {
    const list = [1, 2, 3];
    of(...list)
      .pipe(
        concatMap(item => this.getData(item)),
        bufferCount(list.length),
      )
      .subscribe(s => {
        console.log(s);
      });
  }

  testForkJoin(): void {
    const list = [1, 2, 3];
    forkJoin(list.map(i => this.getData(i)).concat(throwError('err').pipe(catchError(s => of({ err: s })))))
      .pipe()
      .subscribe(s => {
        console.log('forkJoin finish', s);
      });
  }

  testCombineAll(): void {
    interval(1000)
      .pipe(
        take(2),
        map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
      )
      .pipe(combineAll())
      .subscribe(val => console.log(val));
  }

  testConcat(): void {
    // 当 source 永远不完成时，随后的 observables 永远不会运行
    const source = concat(interval(1000)
      .pipe(take(10)), of('This', 'Never', 'Runs'))
      .subscribe(val => console.log('Example: Source never completes, second observable never runs:', val));
  }

  testConcatAll(): void {
    /**
     * @opration contentAll
     * @description 按顺序订阅每个内部 obserable，前一个完成了再订阅下一个
     */
    of(
      interval(1000).pipe(take(5), map(i => ({ i, key: 'obs1' }))),
      interval(500).pipe(take(2), map(i => ({ i, key: 'obs2' }))),
      interval(2000).pipe(take(1), map(i => ({ i, key: 'obs3' })))
    )
      .pipe(concatAll())
      .subscribe(val => console.log(val));
  }

  testMerge(): void {
    /**
     * rxjs merge
     * rxjs/operators merge
     */
    // 每2.5秒发出值
    const first = interval(2500).pipe(take(5));
    // 每2秒发出值
    const second = interval(2000).pipe(take(5));
    // 每1.5秒发出值
    const third = interval(1500).pipe(take(5));
    // 每1秒发出值
    const fourth = interval(1000).pipe(take(5));

    // 从一个 observable 中发出输出值
    const example = merge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
      third.pipe(mapTo('THIRD')),
      fourth.pipe(mapTo('FOURTH'))
    );
    // 输出: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(val => console.log(val));
  }

  testMergeAll(): void {

    const source = interval(500).pipe(take(5));

    /*
      interval 每0.5秒发出一个值。这个值会被映射成延迟1秒的 interval 。mergeAll 操作符接收一个可选参数
      以决定在同一时间有多少个内部 observables 可以被订阅。其余的 observables 会先暂存以等待订阅。
    */
    const example = source
      .pipe(
        map(val =>
          source.pipe(
            delay(1000),
            take(3)
          )
        ),
        mergeAll(2)
      )
      .subscribe(val => console.log(val));
  }

  testPairwise(): void {
    interval(1000)
      .pipe(
        pairwise(),
        take(5)
      )
      .subscribe(console.log);
  }

  testStartWith(): void {
    // 每1秒发出值
    const source = interval(1000);
    // 以 -3, -2, -1 开始
    const example = source.pipe(startWith(-3, -2, -1), take(10));
    // 输出: -3, -2, -1, 0, 1, 2....
    const subscribe = example.subscribe(val => console.log(val));
  }

  testWithLatestFrom(): void {

    // 每5秒发出值
    const source = interval(5000).pipe(take(10));
    // 每1秒发出值
    const secondSource = interval(1000).pipe(take(70));
    const example = source.pipe(
      withLatestFrom(secondSource),
      map(([first, second]) => {
        return `First Source (5s): ${first} Second Source (1s): ${second}`;
      })
    );
    /*
      输出:
      "First Source (5s): 0 Second Source (1s): 4"
      "First Source (5s): 1 Second Source (1s): 9"
      "First Source (5s): 2 Second Source (1s): 14"
      ...
    */
    const subscribe = example.subscribe(val => console.log(val));
  }

  testZip(): void {
    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');
    // 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
    const example = zip(
      sourceOne,
      sourceTwo.pipe(delay(1000)),
      sourceThree.pipe(delay(2000)),
      sourceFour.pipe(delay(3000))
    );
    // 输出: ["Hello", "World!", "Goodbye", "World!"]
    const subscribe = example.subscribe(val => console.log(val));
  }

  getData(i: number): Observable<any> {
    console.log(`do-${i}`);
    return of(i)
      .pipe(
        delay(Math.random() * 2000),
        map(id => ({ id })),
        tap(s => {
          console.log(`get-${i}`, s);
        })
      );
  }
}
