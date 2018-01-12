import { Injectable } from '@angular/core';

@Injectable()
export class SharedServiceService {
  coinKey: string;
  constructor() { }

  setCoinKey = (key: string) => {
    console.log(key, 'came selecetedd >>>');
    return this.coinKey = key;
  }
}
