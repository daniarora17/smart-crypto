import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import { coinUrl } from './Table';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';



import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/race';
import 'rxjs/add/observable/combineLatest';
// import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/merge';


const serverUrl = 'http://13.127.192.245:9191/crypto';

@Injectable()
export class SharedServiceService {
  coinKey: string;
  // allCoinUrl: any = {
  //   buyUCoin: '/buyUCoin/',
  //   coinDelta: 'https://coindelta.com/api/v1/public/getticker/',
  //   zebPay: 'https://live.zebapi.com/api/v1/ticker?currencyCode=inr',
  //   unoCoin: 'https://www.unocoin.com/trade?all',
  //   koinex: '/koinex/',
  //   bitStampltcUsd: '/bitStampLtcUsd/',
  //   cryptopiaUsd: 'https://www.cryptopia.co.nz/api/GetCurrencies',
  //   throughbitbtc: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/btc/inr',
  //   throughbiteth: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/eth/inr',
  //   flitpaybtc: 'https://intercom.flitlancecdn.com/welcome/bit_rate',
  //   pocketBits: 'https://pocketbits.in/Index/getBalanceRates',
  //   bitBns: 'https://bitbns.com/order/getTickerAll',
  //   cryptocompare: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BCH,DASH,LTC,XRP,BTC,OMG,IOTA,QTUM,GNT,NEO,DOGE,ARK,BAT,BCC,BTS,CLOAK,CVC,DGB,PAY&tsyms=INR',
  //   coinMarketCap: 'https://api.coinmarketcap.com/v1/ticker/?convert=INR&limit=6',
  //   cryptonator: 'https://api.cryptonator.com/api/full/btc-usd',
  //   bitStampbtcUsd: '/bitStampBtcUsd/',
  //   bitStampxrpUsd: '/bitStampXrpUsd/',
  //   bitStampethUsd: '/bitStampEthUsd/',
  //   zebPayBtc: '/zebPayBtc/',
  //   zebPayLtc: '/zebPayLtc/',
  //   zebPayBch: '/zebPayBch/',
  //   zebPayXrp: '/zebPayXrp/'
  // };

  allCoinUrl: any = {
    buyUCoin: '/buyUCoin/',
    coinDelta: '/coinDelta/',
    unoCoin: '/unoCoin/',
    koinex: '/koinex/',
    bitStampltcUsd: '/bitStampLtcUsd/',
    cryptopiaUsd: '/cryptopiaUsd/',
    throughbitbtc: '/throughbitbtc/',
    throughbiteth: '/throughbiteth/',
    pocketBits: '/pocketBits/',
    bitBns: '/bitBns/',
    cryptocompare: '/cryptocompare/',
    coinMarketCap: '/coinMarketCap/',
    cryptonator: '/cryptonator/',
    bitStampbtcUsd: '/bitStampBtcUsd/',
    bitStampxrpUsd: '/bitStampXrpUsd/',
    bitStampethUsd: '/bitStampEthUsd/',
    zebPayBtc: '/zebPayBtc/',
    zebPayLtc: '/zebPayLtc/',
    zebPayBch: '/zebPayBch/',
    zebPayXrp: '/zebPayXrp/',
    coinOme: '/coinOme/'
  };

  allCoinObservable = Observable.timer(0, 30000)
    .mergeMap(() =>
      Observable.forkJoin(
        this.http.get( serverUrl + this.allCoinUrl.coinDelta).map((res: Response) => res.json())
          .catch((error: any) => 'CoinDelta Server error'),
        this.http.get(serverUrl + this.allCoinUrl.zebPayBtc).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'ZebPay Server error')),
        this.http.get(serverUrl + this.allCoinUrl.bitStampltcUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(serverUrl + this.allCoinUrl.bitStampbtcUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(serverUrl + this.allCoinUrl.bitStampxrpUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(serverUrl + this.allCoinUrl.bitStampethUsd).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
        this.http.get(serverUrl + this.allCoinUrl.throughbitbtc).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.throughbiteth).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.cryptocompare).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.coinMarketCap).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.cryptonator).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.buyUCoin).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'through bit Server error')),
        this.http.get(serverUrl + this.allCoinUrl.koinex).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Koinex Server error')),
        this.http.get(serverUrl + this.allCoinUrl.zebPayLtc).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        this.http.get(serverUrl + this.allCoinUrl.zebPayBch).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        this.http.get(serverUrl + this.allCoinUrl.zebPayXrp).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Zebpay Server error')),
        this.http.get(serverUrl + this.allCoinUrl.pocketBits).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'Pocket bits Server error')),
        this.http.get(serverUrl + this.allCoinUrl.bitBns).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'BitBns Server error')),
        this.http.get(serverUrl + this.allCoinUrl.coinOme).map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error || 'CoinOme Server error'))
      )
    );


  constructor(private http: Http) { }

  setCoinKey = (key: string) => {
    return this.coinKey = key;
  }
}
