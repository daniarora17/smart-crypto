import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import { coinUrl } from './Table';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/interval';



@Injectable()
export class SharedServiceService {
  coinKey: string;
  baseUrl: String = 'http://localhost:9191/crypto';
  // allCoinUrl: any = {
  //   buyUCoin: '/buyUCoin/',
  //   coinDelta: 'https://coindelta.com/api/v1/public/getticker/',
  //   zebPay: 'https://live.zebapi.com/api/v1/ticker?currencyCode=inr',
  //   unoCoin: 'https://www.unocoin.com/trade?all', // text/html problem
  //   koinex: '/koinex/',
  //   ??btcxIndia: 'https://api.btcxindia.com/ticker/',
  //   bitStampltcUsd: '/bitStampLtcUsd/',
  //   ??cryptopiaUsd: 'https://www.cryptopia.co.nz/api/GetCurrencies',
  //   throughbitbtc: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/btc/inr',// text/html problem
  //   throughbiteth: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/eth/inr',// text/html problem
  //   flitpaybtc: 'https://intercom.flitlancecdn.com/welcome/bit_rate', // text/html problem
  //   pocketBits: 'https://pocketbits.in/Index/getBalanceRates',
  //   bitBns: 'https://bitbns.com/order/getTickerAll',
  //   cryptocompare: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BCH,DASH,LTC,XRP,BTC,OMG,IOTA,QTUM,GNT,NEO,DOGE,ARK,BAT,BCC,BTS,CLOAK,CVC,DGB,PAY&tsyms=INR',
  //   coinMarketCap: 'https://api.coinmarketcap.com/v1/ticker/?convert=INR&limit=6', // can be limited to any amount
  //   cryptonator: 'https://api.cryptonator.com/api/full/btc-usd',
  //   bitStampbtcUsd: '/bitStampBtcUsd/',
  //   bitStampxrpUsd: '/bitStampXrpUsd/',
  //   bitStampethUsd: '/bitStampEthUsd/',
  //   zebPayBtc: 'https://www.zebapi.com/api/v1/market/ticker-new/btc/inr',
  //   zebPayLtc: 'https://www.zebapi.com/api/v1/market/ticker-new/ltc/inr',
  //   zebPayBch: 'https://www.zebapi.com/api/v1/market/ticker-new/bch/inr',
  //   zebPayXrp: 'https://www.zebapi.com/api/v1/market/ticker-new/xrp/inr'
  // };

  allCoinUrl: any = {
    buyUCoin: '/buyUCoin/',
    coinDelta: '/coinDelta/',
    zebPay: '/zebPay/',
    unoCoin: '/unoCoin/',
    koinex: '/koinex/',
    btcxIndia: '/btcxIndia/',
    bitStampLtcUsd: '/bitStampLtcUsd/',
    cryptopiaUsd: '/cryptopiaUsd/',
    throughbitbtc: '/throughbitbtc/',
    throughbiteth: '/throughbiteth/',
    flitpaybtc: '/flitpaybtc/',
    pocketBits: '/pocketBits/',
    bitBns: '/bitBns/',
    cryptocompare: '/cryptocompare/',
    coinMarketCap: '/coinMarketCap/',
    cryptonator: '/cryptonator/',
    bitStampBtcUsd: '/bitStampBtcUsd/',
    bitStampXrpUsd: '/bitStampXrpUsd/',
    bitStampEthUsd: '/bitStampEthUsd/',
    zebPayBtc: '/zebPayBtc/',
    zebPayLtc: '/zebPayLtc/',
    zebPayBch: '/zebPayBch/',
    zebPayXrp: '/zebPayXrp/'
  };

  allCoinObservable = Observable.interval(15000)
    .switchMap(() =>
      Observable.forkJoin(
        this.http.get( this.baseUrl + this.allCoinUrl.coinDelta).map((res: Response) => res.json())
          .catch((error: any) => 'CoinDelta Server error'),
        this.http.get(this.baseUrl + this.allCoinUrl.zebPay).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'ZebPay Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.bitStampLtcUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.bitStampBtcUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.bitStampXrpUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.bitStampEthUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.throughbitbtc).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.throughbiteth).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.flitpaybtc).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.cryptocompare).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.coinMarketCap).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.cryptonator).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.buyUCoin).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(this.baseUrl + this.allCoinUrl.koinex).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Koinex Server error'))
        // this.http.get(this.allCoinUrl.zebPayBtc).map((res: Response) => res.json())
        //   .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        // this.http.get(this.allCoinUrl.zebPayLtc).map((res: Response) => res.json())
        //   .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        // this.http.get(this.allCoinUrl.zebPayBch).map((res: Response) => res.json())
        //   .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        // this.http.get(this.allCoinUrl.zebPayXrp).map((res: Response) => res.json())
        //   .catch((error: any) => Observable.throw(error || 'Zebpay Server error'))
    )
  );
  constructor(private http: Http) { }

  setCoinKey = (key: string) => {
    console.log(this.allCoinUrl, 'alll coin urllll>>');
    console.log(key, 'came selecetedd >>>');
    return this.coinKey = key;
  }

  getbuyUCoinPrice = () => {
    const buycoinUrl = this.allCoinUrl.buyucoin;
    // const headers: any = new Headers().append('Access-Control-Allow-Origin', '*');
    console.log(buycoinUrl, 'urll>>>');
    // console.log(headers, 'req heaess>>');
    return this.http.get(buycoinUrl)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( error || 'BuyUCoin Server error'));
  }


}
