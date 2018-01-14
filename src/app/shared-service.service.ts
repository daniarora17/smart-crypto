import { Injectable } from '@angular/core';
import { coinUrl } from './Table';

@Injectable()
export class SharedServiceService {
  coinKey: string;
  allCoinUrl: any = coinUrl;
  constructor() { }

  setCoinKey = (key: string) => {
    console.log(key, 'came selecetedd >>>');
    return this.coinKey = key;
  }
}
