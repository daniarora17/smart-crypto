import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Table } from '../Table';
import { CurrencyPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
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
  responseData: any[];
  tableData: any = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _sharedService: SharedServiceService) { }

  ngOnInit() {
    // this.dataSource.data = ELEMENT_DATA;
    // console.log(this.coinKey, 'coinnn keeyyy>>>');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    // console.log(changes, 'changes>>>>>.');
    this.coinKey = changes.selectedCoin.currentValue;
    console.log(this.coinKey, 'vvccchhgvcgfhc>>>');
    // this.buyCoinData();
    this._sharedService.allCoinObservable.subscribe(result => {
      this.responseData = result;
      this.tableData = [];
      console.log(this.tableData, 'dhbdbcfjkcfj>>>');
      // this.transformData(this.coinKey, this.responseData);
      console.log(result, 'results>>>>');
      this.transformCoinDeltaResponse(this.coinKey, this.responseData[0]);
      if (this.coinKey === 'btc') {
        this.transformZebpayResponse(this.responseData[1]);
        this.transformBitStampBtc(this.responseData[3]);
        this.transformThroughbitBtc(this.responseData[6]);
      } else if (this.coinKey === 'ltc') {
        this.transformBitStampLtc(this.responseData[2]);
      } else if (this.coinKey === 'xrp') {
        this.transformBitStampXrp(this.responseData[4]);
      } else if (this.coinKey === 'eth') {
        this.transformBitStampEth(this.responseData[5]);
        this.transformThroughbitEth(this.responseData[7]);
      }
      return this.dataSource.data = this.tableData;
    });
  }

  private transformData(key, data) {
    console.log(key, 'keyyy>>>');
    console.log(data, 'gottt data>>>');
    data.forEach(d => {
      console.log(d, 'data>>>>>>');
    });
  }

  private transformCoinDeltaResponse(key, res) {
    const keyINR = `${key}-inr`;
    const tempData: any = {};
    res.filter((data) => {
      if (data.MarketName.includes(keyINR)) {
        tempData.position = 1;
        tempData.buy = data.Bid;
        tempData.sell = data.Ask;
        tempData.name = 'Coin Delta';
        return this.tableData.push(tempData);
      }
    });
  }

  private transformZebpayResponse(res) {
    const tempData: any = {};
    console.log(this.tableData, 'table data>>>>');
    if (res) {
      tempData.position = 2;
      tempData.buy = res.buy;
      tempData.sell = res.sell;
      tempData.name = 'ZebPay';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampLtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 2;
      tempData.buy = res.bid * 65;
      tempData.sell = res.ask * 65;
      tempData.name = 'Bit Stamp(LTC)';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampBtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 3;
      tempData.buy = res.bid * 65;
      tempData.sell = res.ask * 65;
      tempData.name = 'Bit Stamp(BTC)';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampXrp(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 2;
      tempData.buy = res.bid * 65;
      tempData.sell = res.ask * 65;
      tempData.name = 'Bit Stamp(XRP)';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampEth(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 2;
      tempData.buy = res.bid * 65;
      tempData.sell = res.ask * 65;
      tempData.name = 'Bit Stamp(ETH)';
      return this.tableData.push(tempData);
    }
  }

  private transformThroughbitBtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 4;
      tempData.buy = res.data.price[0].buy_price;
      tempData.sell = res.data.price[0].sell_price;
      tempData.name = 'ThroughBit(BTC)';
      return this.tableData.push(tempData);
    }
  }

  private transformThroughbitEth(res) {
    const tempData: any = {};
    if (res) {
      tempData.position = 3;
      tempData.buy = res.data.price[0].buy_price;
      tempData.sell = res.data.price[0].sell_price;
      tempData.name = 'ThroughBit(ETH)';
      return this.tableData.push(tempData);
    }
  }

  private buyCoinData() {
    this._sharedService.getbuyUCoinPrice().subscribe(response => {
      console.log(response, 'buycoin response>>>');
    });
  }
}

const ELEMENT_DATA: Table[] = [
  { position: 1, name: 'Hydrogen', buy: 1.0079, sell: 111 },
  { position: 2, name: 'Helium', buy: 4.0026, sell: 111 },
  { position: 3, name: 'Lithium', buy: 6.9414576565655, sell: 222 },
  { position: 4, name: 'Beryllium', buy: 9.012276767, sell: 222 },
  { position: 5, name: 'Boron', buy: 105445474567.8118787678678, sell: 333 },
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
