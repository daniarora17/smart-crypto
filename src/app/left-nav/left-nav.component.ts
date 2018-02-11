import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.less']
})
export class LeftNavComponent implements OnInit {
  @Output() coinClicked = new EventEmitter<any>();
  coinList: Array<any> = [
    {
      'key': 'btc',
      'name': 'Bit Coin',
      'url': './assets/bit-coin.png'
    },
    {
      'key': 'xrp',
      'name': 'Ripple',
      'url': './assets/ripple.png'
    },
    {
      'key': 'ltc',
      'name': 'Lite Coin'
    },
    {
      'key': 'eth',
      'name': 'Ethereum'
    },
    {
      'key': 'bch',
      'name': 'Bit Coin Cash'
    },
    {
      'key': 'omg',
      'name': 'OmiseGo'
    },
    {
      'key': 'qtum',
      'name': 'Qtum'
    },
    {
      'key': 'gnt',
      'name': 'Golem'
    }
  ];

  constructor(private _sharedService: SharedServiceService) { }

  ngOnInit() {
  }

  getSelectedCoin = (coin) => {
    this.coinClicked.emit(coin);
    this._sharedService.setCoinKey(coin.key);
    console.log(coin, 'got selectedd>>>>');
  }
}
