import { Component, OnInit } from '@angular/core';
import { Observable, of, interval, from, merge, BehaviorSubject } from 'rxjs';
import { switchMap, switchMapTo, delay, take, scan, map } from 'rxjs/operators';
import { TableData } from '../table-data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  data$: Observable<Array<Observable<TableData>>>;

  constructor() {

    const even$: Observable<TableData> = interval(1000)
      .pipe(switchMap(() => of(new TableData('Shiva', this.getRandomId()))));

    const odd$: Observable<TableData> = interval(1000)
      .pipe(switchMap(() => of(new TableData('Pashmi', this.getRandomId()))));

    this.data$ = merge(even$, odd$)
      .pipe(scan((acc, curr: TableData) => {
        acc.get(curr.timer) ?
          (console.log('foo'), acc.get(curr.timer).next(curr)) :
          acc.set(curr.timer, new BehaviorSubject(curr));
        return acc;
      }, new Map<number, BehaviorSubject<TableData>>()))
      .pipe(map(x => Array.from(x.values())))
      .pipe(
        take(10),
        map(d => d.sort((a, b) => a.value.timer - b.value.timer)));
  }


  ngOnInit() {

  }

  getRandomId(): number {
    return Math.floor((Math.random() * 10) + 1);
  }

}
