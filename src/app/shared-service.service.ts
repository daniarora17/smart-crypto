import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import { coinUrl } from './Table';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class SharedServiceService {
  coinKey: string;
  allCoinUrl: any = {
    buyUCoin: '/buyUCoin/',
    coinDelta: 'https://coindelta.com/api/v1/public/getticker/',
    zebPay: 'https://live.zebapi.com/api/v1/ticker?currencyCode=inr',
    unoCoin: 'https://www.unocoin.com/trade?all',
    koinex: 'https://koinex.in/api/ticker',
    btcxIndia: 'https://api.btcxindia.com/ticker/',
    bitStampltcUsd: '/bitStampLtcUsd/',
    cryptopiaUsd: 'https://www.cryptopia.co.nz/api/GetCurrencies',
    bittrex: 'https://bittrex.com/api/v1.1/public/getticker?market=btc-xrp',
    throughbitbtc: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/btc/inr',
    throughbiteth: 'https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/eth/inr',
    flitpaybtc: 'https://intercom.flitlancecdn.com/welcome/bit_rate',
    pocketBits: 'https://pocketbits.in/Index/getBalanceRates',
    bitBns: 'https://bitbns.com/order/getTickerAll',
    cryptocompare: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,LTC,XRP,BTC,OMG,IOTA,QTUM,GNT,NEO,DOGE,ARK,BAT,BCC,BTS,CLOAK,CVC,DGB,PAY&tsyms=INR',
    coinMarketCap: 'https://api.coinmarketcap.com/v1/ticker/', // can be limited to any amunr
    cryptonator: 'https://api.cryptonator.com/api/full/btc-usd',
    bitStampbtcUsd: '/bitStampBtcUsd/',
    bitStampxrpUsd: '/bitStampXrpUsd/',
    bitStampethUsd: '/bitStampEthUsd/'
  };

  allCoinObservable = Observable.forkJoin(
    this.http.get(this.allCoinUrl.coinDelta).map((res: Response) => res.json())
      .catch((error: any) => 'CoinDelta Server error'),
    this.http.get(this.allCoinUrl.zebPay).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'ZebPay Server error')),
    this.http.get(this.allCoinUrl.koinex).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Koinex Server error')),
    this.http.get(this.allCoinUrl.bitStampltcUsd).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
    this.http.get(this.allCoinUrl.bitStampbtcUsd).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
    this.http.get(this.allCoinUrl.bitStampxrpUsd).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
    this.http.get(this.allCoinUrl.bitStampethUsd).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'BItStamp Server error')),
    this.http.get(this.allCoinUrl.cryptopiaUsd).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Cryptopia Server error')),
    this.http.get(this.allCoinUrl.throughbitbtc).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.throughbiteth).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.flitpaybtc).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.cryptocompare).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.coinMarketCap).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.cryptonator).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error')),
    this.http.get(this.allCoinUrl.buyUCoin).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'through bit Server error'))
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
