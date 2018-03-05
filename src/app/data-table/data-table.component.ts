import { Component, Input, OnChanges, OnInit , AfterViewInit, ViewChild , DoCheck, KeyValueDiffers, KeyValueChangeRecord, KeyValueChanges, IterableDiffers, KeyValueDiffer} from '@angular/core';
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
export class DataTableComponent implements OnChanges, AfterViewInit, OnInit, DoCheck {
  @Input() selectedCoin: any;
  sendBestPriceData: Boolean = true;
  coinKey: string;
  displayedColumns = ['name', 'buy', 'sell'];
  responseData: any[];
  tableData: any[] = [];
  dataSource = new MatTableDataSource();
  differ: any;
  diffObject: any = {};

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _sharedService: SharedServiceService, private spinnerService: Ng4LoadingSpinnerService, private _differs: KeyValueDiffers ) {
    this.differ = _differs.find({}).create();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    // this.differ = this.differs.find(this.tableData);
    // console.log(this.differ, 'in inittttttttt>>>>');
  }

  ngDoCheck() {
    // if (this.tableData) {
    //   this.tableData.map((data) => {
    //     setTimeout(() => {
    //       if (data.downBuy) {
    //         data.downBuy = false;
    //       }
    //       if (data.downSell) {
    //         data.downSell = false;
    //       }
    //       if (data.upSell) {
    //         data.upSell = false;
    //       }
    //       if (data.upBuy) {
    //         data.upBuy = false;
    //       }
    //     }, 100);
    //     this.dataSource.data = this.tableData;
    //   });
    // }
  }

  ngOnChanges(changes: any) {
    this.spinnerService.show();
    this.sendBestPriceData = true;
    this.coinKey = changes.selectedCoin.currentValue;
    this._sharedService.allCoinObservable
    .subscribe(result => {
      this.responseData = result;
      this.tableData = [];
      this.transformKoinexData(this.coinKey, this.responseData[12]);
      this.transformCoinOme(this.coinKey, this.responseData[18]);
      this.transformCoinDeltaResponse(this.coinKey, this.responseData[0]);
      this.transformCryptoCompare(this.coinKey, this.responseData[8]);
      this.transformCoinMarketCap(this.coinKey, this.responseData[9]);
      this.transformBuyCoinData(this.coinKey, this.responseData[11]);
      this.transformPocketBits(this.coinKey, this.responseData[16]);
      this.transformBitBns(this.coinKey, this.responseData[17]);
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
      this.spinnerService.hide();
      this.sendBestPriceData = false;
      return this.dataSource.data = this.tableData;
    });
  }

  private getDiff(oldData, newData) {
    if (oldData && newData) {
      newData.upBuy = false;
      newData.upSell = false;
      newData.downBuy = false;
      newData.downSell = false;
      oldData.map((data) => {
        if (data.name  === newData.name) {
          if (parseFloat(data.buy) < parseFloat(newData.buy)) {
            newData.downBuy = false;
            return newData.upBuy = true;
          } else if (parseFloat(data.buy) > parseFloat(newData.buy)) {
            newData.upBuy = false;
            return newData.downBuy = true;
          }
          if (parseFloat(data.sell) < parseFloat(newData.sell)) {
            newData.downSell = false;
            return newData.upSell = true;
          } else if (parseFloat(data.sell) > parseFloat(newData.sell)) {
            newData.upSell = false;
            return newData.downSell = true;
          }
        }
      });
    } else {
      newData.up = false;
      newData.down = false;
    }
  }

  private transformCoinOme(key, res) {
    const keySpec = `${key}-inr`;
    const oldData = this.dataSource.data;
    console.log(this.dataSource.data, 'data soyrceee>>>');
    // console.log(tempData)
    const tempData: any = {};
    if (res.data !== null && res.data[keySpec]) {
      tempData.buy = res.data[keySpec].lowest_ask;
      tempData.sell = res.data[keySpec].highest_bid;
      tempData.name = 'CoinOme';
      tempData.redirect = 'https://www.coinome.com/';
      this.getDiff(oldData, tempData);
      console.log(tempData, 'tempData>>>>');
      return this.tableData.push(tempData);
    }
  }

  private transformBitBns(key, res) {
    if (res.data !== null) {
      const upperKey = key.toUpperCase();
      const resData = res.data.body;
      const tempData: any = {};
      resData.map((data) => {
        if (data[upperKey]) {
          tempData.buy = data[upperKey].buyPrice;
          tempData.sell = data[upperKey].sellPrice;
          tempData.name = 'BitBns';
          tempData.redirect = 'https://bitbns.com/';
          this.getDiff(this.dataSource.data, tempData);
          return this.tableData.push(tempData);
        }
      });
    }
  }

  private transformPocketBits(key, res) {
    if (key === 'btc') {
      key = 'BTC';
    } else if (key === 'eth') {
      key = 'Eth';
    }
    const buyRate = `${key}_SellingRate`;
    const sellRate = `${key}_BuyingRate`;
    const tempData: any = {};
    if (res.data !== null && res.responseCode === 200 && res.data.body.rates[buyRate] && res.data.body.rates[sellRate]) {
      tempData.buy = res.data.body.rates[buyRate];
      tempData.sell = res.data.body.rates[sellRate];
      tempData.name = 'PocketBits';
      tempData.redirect = 'https://pocketbits.in/';
      this.getDiff(this.dataSource.data, tempData);
      return this.tableData.push(tempData);
    }
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
          this.getDiff(this.dataSource.data, tempData);
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
      this.getDiff(this.dataSource.data, tempData);
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
          this.getDiff(this.dataSource.data, tempData);
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
      this.getDiff(this.dataSource.data, tempData);
      return this.tableData.push(tempData);
    }
  }

  private transformBitStamp(res) {
    const tempData: any = {};
    if (res.data !== null) {
      tempData.buy = res.data.bid * 70;
      tempData.sell = res.data.ask * 70;
      tempData.name = 'Bit Stamp';
      tempData.redirect = 'https://www.bitstamp.net/';
      this.getDiff(this.dataSource.data, tempData);
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
      this.getDiff(this.dataSource.data, tempData);
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
          this.getDiff(this.dataSource.data, tempData);
          return this.tableData.push(tempData);
        }else {
          return;
        }
      });
    }
  }

  private transformBuyCoinData(key, res) {
    if (res.data !== null) {
      if (key === 'bch') {
        key = 'bcc';
      }
      const keyBuy = `${key}_buy_price`;
      const keySell = `${key}_sell_price`;
      const data = res.data.body.BuyUcoin_data[0];
      const tempData: any = {};
      if (data[keyBuy] !== null) {
        tempData.buy = data[keyBuy];
        tempData.sell = data[keySell];
        tempData.name = 'BuyUcoin';
        tempData.redirect = 'https://www.buyucoin.com/';
        this.getDiff(this.dataSource.data, tempData);
        return this.tableData.push(tempData);
      }
    }
  }

  private transformKoinexData(key, res) {
    if (res.data !== null) {
      const keyUpper = key.toUpperCase();
      const data = res.data.stats[keyUpper];
      const tempData: any = {};
      if (data !== null && data) {
        tempData.buy = data.lowest_ask;
        tempData.sell = data.highest_bid;
        tempData.name = 'Koinex';
        tempData.redirect = 'https://koinex.in/';
        this.getDiff(this.dataSource.data, tempData);
        return this.tableData.push(tempData);
      }
    }
  }
}
