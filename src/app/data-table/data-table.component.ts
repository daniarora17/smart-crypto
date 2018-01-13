import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Table } from '../Table';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() selectedCoin: any;
  coinKey: string;
  displayedColumns = ['position', 'name', 'buy', 'sell'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _sharedService: SharedServiceService) { }

  ngOnInit() {
    this.dataSource.data = ELEMENT_DATA;
    // console.log(this.coinKey, 'coinnn keeyyy>>>');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    // console.log(changes, 'changes>>>>>.');
    this.coinKey = changes.selectedCoin.currentValue;
    console.log(this.coinKey, 'vvccchhgvcgfhc>>>');
  }
}

const ELEMENT_DATA: Table[] = [
  { position: 1, name: 'Hydrogen', buy: 1.0079, sell: 111 },
  { position: 2, name: 'Helium', buy: 4.0026, sell: 111 },
  { position: 3, name: 'Lithium', buy: 6.941, sell: 222 },
  { position: 4, name: 'Beryllium', buy: 9.0122, sell: 222 },
  { position: 5, name: 'Boron', buy: 10.811, sell: 333 },
  { position: 6, name: 'Carbon', buy: 12.0107, sell: 333 },
  { position: 7, name: 'Nitrogen', buy: 14.0067, sell: 333 },
  { position: 8, name: 'Oxygen', buy: 15.9994, sell: 444 },
  { position: 9, name: 'Fluorine', buy: 18.9984, sell: 444 },
  { position: 10, name: 'Neon', buy: 20.1797, sell: 444 },
  { position: 11, name: 'Sodium', buy: 22.9897, sell: 444 },
  { position: 12, name: 'Magnesium', buy: 24.305, sell: 555 },
  { position: 13, name: 'Aluminum', buy: 26.9815, sell: 555 },
  { position: 14, name: 'Silicon', buy: 28.0855, sell: 55 },
  { position: 15, name: 'Phosphorus', buy: 30.9738, sell: 8898 },
  { position: 16, name: 'Sulfur', buy: 32.065, sell: 9097 },
  { position: 17, name: 'Chlorine', buy: 35.453, sell: 6767 },
  { position: 18, name: 'Argon', buy: 39.948, sell: 9090 },
  { position: 19, name: 'Potassium', buy: 39.0983, sell: 980787 },
  { position: 20, name: 'Calcium', buy: 40.078, sell: 90989},
];
