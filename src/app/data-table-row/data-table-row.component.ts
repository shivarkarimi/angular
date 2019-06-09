import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../table-data';

@Component({
  selector: '[app-data-table-row]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss']
})
export class DataTableRowComponent implements OnInit, OnChanges {

  @Input() data: Array<Observable<TableData>>

  ngOnInit() {
    this.data &&
      this.data.forEach(x => x.subscribe(c => console.log(c)));
  }

  ngOnChanges() {
    console.log('CHANGED!');
  }

}
