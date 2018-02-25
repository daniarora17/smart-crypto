import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Table } from '../Table';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  showSpinner: Boolean = true;
  @Input() selectedCoin: any;
  coinKey: string;
  displayedColumns = ['name', 'buy', 'sell'];
  responseData: any[];
  tableData: any = [];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _sharedService: SharedServiceService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    this.spinnerService.show();
    this.showSpinner = true;
    this.coinKey = changes.selectedCoin.currentValue;
    this._sharedService.allCoinObservable
    .subscribe(result => {
      this.responseData = result;
      this.tableData = [];
      this.transformKoinexData(this.coinKey, this.responseData[12]);
      this.transformCoinDeltaResponse(this.coinKey, this.responseData[0]);
      this.transformCryptoCompare(this.coinKey, this.responseData[8]);
      this.transformCoinMarketCap(this.coinKey, this.responseData[9]);
      this.transformBuyCoinData(this.coinKey, this.responseData[11]);
      if (this.coinKey === 'btc') {
        this.transformZebpayResponse(this.responseData[1]);
        this.transformBitStamp(this.responseData[3]);
        this.transformThroughbit(this.responseData[6]);
        this.transformCryptonatorBtc(this.responseData[10]);
      } else if (this.coinKey === 'ltc') {
        this.transformBitStamp(this.responseData[2]);
        this.transformZebpayResponse(this.responseData[13]);
      } else if (this.coinKey === 'xrp') {
        this.transformBitStamp(this.responseData[4]);
        this.transformZebpayResponse(this.responseData[15]);
      } else if (this.coinKey === 'eth') {
        this.transformBitStamp(this.responseData[5]);
        this.transformThroughbit(this.responseData[7]);
      } else if (this.coinKey === 'bch') {
        this.transformZebpayResponse(this.responseData[14]);
      }
      this.showSpinner = false;
      this.spinnerService.hide();
      return this.dataSource.data = this.tableData;
    });
  }

  private transformCoinDeltaResponse(key, res) {
    const keyINR = `${key}-inr`;
    const tempData: any = {};
    if (res.data !== null) {
      res.data.filter((data) => {
        if (data.MarketName.includes(keyINR)) {
          tempData.buy = data.Bid;
          tempData.sell = data.Ask;
          tempData.name = 'Coin Delta';
          tempData.redirect = 'https://coindelta.com/market?active=BTC-INR';
          return this.tableData.push(tempData);
        }
      });
    }
  }

  private transformCryptoCompare(key, res) {
    const tempData: any = {};
    if (res.data !== null) {
      tempData.buy = res.data[key.toUpperCase()].INR;
      tempData.sell = tempData.buy - (tempData.buy * 0.01);
      tempData.name = 'Crypto Compare';
      tempData.redirect = 'https://www.cryptocompare.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformCoinMarketCap(key, res) {
    const tempData: any = {};
    if (res.data !== null) {
      res.data.filter((data) => {
        if (data.symbol.toLowerCase() === key) {
          tempData.buy = data.price_inr;
          tempData.sell = tempData.buy - (tempData.buy * 0.01);
          tempData.name = 'Coin Market';
          tempData.redirect = 'https://coinmarketcap.com/';
          return this.tableData.push(tempData);
        }
      });
    }
  }

  private transformZebpayResponse(res) {
    const tempData: any = {};
    if (res.data !== null) {
      tempData.buy = res.data.buy;
      tempData.sell = res.data.sell;
      tempData.name = 'ZebPay';
      tempData.redirect = 'https://www.zebpay.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStamp(res) {
    const tempData: any = {};
    if (res.data !== null) {
      fx.settings = { from: 'USD', to: 'INR' };
      tempData.buy = fx.convert(res.data.bid);
      tempData.sell = res.data.ask * 70;
      tempData.name = 'Bit Stamp';
      tempData.redirect = 'https://www.bitstamp.net/';
      return this.tableData.push(tempData);
    }
  }

  private transformThroughbit(res) {
    const tempData: any = {};
    if (res.data !== null) {
      tempData.buy = res.data.data.price[0].buy_price;
      tempData.sell = res.data.data.price[0].sell_price;
      tempData.name = 'ThroughBit';
      tempData.redirect = 'https://www.throughbit.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformCryptonatorBtc(res) {
    if (res.data !== null) {
      res.data.ticker.markets.filter((data) => {
        const tempData: any = {};
        if (data.market === 'Bittrex' || data.market === 'BitFinex' || data.market === 'Livecoin' || data.market === 'Exmo') {
          tempData.buy = data.price * 67;
          tempData.sell = tempData.buy - (tempData.buy * 0.01);
          tempData.name = data.market;
          if (data.market === 'Bittrex') {
            tempData.redirect = 'https://bittrex.com/';
          }else if (data.market === 'BitFinex') {
            tempData.redirect = 'https://www.bitfinex.com/';
          }else if (data.market === 'Exmo') {
            tempData.redirect = 'https://exmo.com/';
          }
          return this.tableData.push(tempData);
        }else {
          return;
        }
      });
    }
  }

  private transformBuyCoinData(key, res) {
    if (res.data !== null) {
      const keyBuy = `${key}_buy_price`;
      const keySell = `${key}_sell_price`;
      const data = res.data.body.BuyUcoin_data[0];
      const tempData: any = {};
      if (data[keyBuy] !== null) {
        tempData.buy = data[keyBuy];
        tempData.sell = data[keySell];
        tempData.name = 'Buy U Coin';
        tempData.redirect = 'https://www.buyucoin.com/';
        return this.tableData.push(tempData);
      }
    }
  }

  private transformKoinexData(key, res) {
    if (res.data !== null) {
      const keyUpper = key.toUpperCase();
      const data = res.data.stats[keyUpper];
      console.log(data, 'data>>>>>>>');
      const tempData: any = {};
      if (data !== null) {
        tempData.buy = data.lowest_ask;
        tempData.sell = data.highest_bid;
        tempData.name = 'Koinex';
        tempData.redirect = 'https://koinex.in/';
        return this.tableData.push(tempData);
      }
    }
  }
}


