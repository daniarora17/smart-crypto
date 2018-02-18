import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Table } from '../Table';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatSort } from '@angular/material';

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
    this.showSpinner = true;
    // console.log(changes, 'changes>>>>>.');
    this.coinKey = changes.selectedCoin.currentValue;
    console.log(this.coinKey, 'vvccchhgvcgfhc>>>');
    // this.buyCoinData();
    this._sharedService.allCoinObservable.subscribe(result => {
      this.responseData = result;
      this.tableData = [];
      console.log(this.tableData, 'dhbdbcfjkcfj>>>');
      console.log(result, 'results>>>>');
      this.transformKoinexData(this.coinKey, this.responseData[13]);
      this.transformCoinDeltaResponse(this.coinKey, this.responseData[0]);
      this.transformCryptoCompare(this.coinKey, this.responseData[9]);
      this.transformCoinMarketCap(this.coinKey, this.responseData[10]);
      this.transformBuyCoinData(this.coinKey, this.responseData[12]);
      if (this.coinKey === 'btc') {
        this.transformZebpayResponse(this.responseData[1]);
        this.transformBitStampBtc(this.responseData[3]);
        this.transformThroughbitBtc(this.responseData[6]);
        this.transformFlitpayBtc(this.responseData[8]);
        this.transformCryptonatorBtc(this.responseData[11]);
      } else if (this.coinKey === 'ltc') {
        this.transformBitStampLtc(this.responseData[2]);
      } else if (this.coinKey === 'xrp') {
        this.transformBitStampXrp(this.responseData[4]);
      } else if (this.coinKey === 'eth') {
        this.transformBitStampEth(this.responseData[5]);
        this.transformThroughbitEth(this.responseData[7]);
      }
      this.showSpinner = false;
      return this.dataSource.data = this.tableData;
    });
  }

  private transformCoinDeltaResponse(key, res) {
    const keyINR = `${key}-inr`;
    const tempData: any = {};
    res.filter((data) => {
      if (data.MarketName.includes(keyINR)) {
        tempData.buy = data.Bid;
        tempData.sell = data.Ask;
        tempData.name = 'Coin Delta';
        tempData.redirect = 'https://coindelta.com/market?active=BTC-INR';
        return this.tableData.push(tempData);
      }
    });
  }

  private transformCryptoCompare(key, res) {
    const tempData: any = {};
    tempData.buy = res[key.toUpperCase()].INR;
    tempData.sell = tempData.buy - (tempData.buy * 0.01);
    tempData.name = 'Crypto Compare';
    tempData.redirect = 'https://www.cryptocompare.com/';
    return this.tableData.push(tempData);
  }

  private transformCoinMarketCap(key, res) {
    const tempData: any = {};
    res.filter((data) => {
      if (data.symbol.toLowerCase() === key) {
        tempData.buy = data.price_inr;
        tempData.sell = tempData.buy - (tempData.buy * 0.01);
        tempData.name = 'Coin Market';
        tempData.redirect = 'https://coinmarketcap.com/';
        return this.tableData.push(tempData);
      }
    });
  }

  private transformZebpayResponse(res) {
    const tempData: any = {};
    console.log(this.tableData, 'table data>>>>');
    if (res) {
      tempData.buy = res.buy;
      tempData.sell = res.sell;
      tempData.name = 'ZebPay';
      tempData.redirect = 'https://www.zebpay.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampLtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.bid * 70;
      tempData.sell = res.ask * 70;
      tempData.name = 'Bit Stamp(LTC)';
      tempData.redirect = 'https://www.bitstamp.net/';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampBtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.bid * 70;
      tempData.sell = res.ask * 70;
      tempData.name = 'Bit Stamp(BTC)';
      tempData.redirect = 'https://www.bitstamp.net/';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampXrp(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.bid * 70;
      tempData.sell = res.ask * 70;
      tempData.name = 'Bit Stamp(XRP)';
      tempData.redirect = 'https://www.bitstamp.net/';
      return this.tableData.push(tempData);
    }
  }

  private transformBitStampEth(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.bid * 70;
      tempData.sell = res.ask * 70;
      tempData.name = 'Bit Stamp(ETH)';
      tempData.redirect = 'https://www.bitstamp.net/';
      return this.tableData.push(tempData);
    }
  }

  private transformThroughbitBtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.data.price[0].buy_price;
      tempData.sell = res.data.price[0].sell_price;
      tempData.name = 'ThroughBit(BTC)';
      tempData.redirect = 'https://www.throughbit.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformThroughbitEth(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.data.price[0].buy_price;
      tempData.sell = res.data.price[0].sell_price;
      tempData.name = 'ThroughBit(ETH)';
      tempData.redirect = 'https://www.throughbit.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformFlitpayBtc(res) {
    const tempData: any = {};
    if (res) {
      tempData.buy = res.buyrate;
      tempData.sell = res.sellrate;
      tempData.name = 'FlitPay';
      tempData.redirect = 'https://www.flitpay.in/';
      return this.tableData.push(tempData);
    }
  }

  private transformCryptonatorBtc(res) {
    res.ticker.markets.filter((data) => {
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

  private transformBuyCoinData(key, res) {
    const keyBuy = `${key}_buy_price`;
    const keySell = `${key}_sell_price`;
    const data = res.BuyUcoin_data[0];
    const tempData: any = {};
    if (data[keyBuy]) {
      tempData.buy = data[keyBuy];
      tempData.sell = data[keySell];
      tempData.name = 'Buy U Coin';
      tempData.redirect = 'https://www.buyucoin.com/';
      return this.tableData.push(tempData);
    }
  }

  private transformKoinexData(key, res) {
    const keyUpper = key.toUpperCase();
    const data = res.stats[keyUpper];
    console.log(data, 'data>>>>>>>');
    const tempData: any = {};
    if (data) {
      tempData.buy = data.lowest_ask;
      tempData.sell = data.highest_bid;
      tempData.name = 'Koinex';
      tempData.redirect = 'https://koinex.in/';
      return this.tableData.push(tempData);
    }
  }
}


