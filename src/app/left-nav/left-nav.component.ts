import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.less'],
  animations: [
    trigger('tabState', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.2)', backgroundColor: '#085c67' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LeftNavComponent implements OnInit {
  @Output() coinClicked = new EventEmitter<any>();
  state: Object = {
    'btc': 'inactive',
    'xrp': 'inactive',
    'ltc': 'inactive',
    'eth': 'inactive',
    'bch': 'inactive',
    'omg': 'inactive',
    'qtum': 'inactive',
    'gnt': 'inactive'
  };
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
      'name': 'Lite Coin',
      'url': './assets/litecoin.png'
    },
    {
      'key': 'eth',
      'name': 'Ethereum',
      'url': './assets/eth.png'
    },
    {
      'key': 'bch',
      'name': 'Bit Coin Cash',
      'url': './assets/bcc.png'
    },
    {
      'key': 'omg',
      'name': 'OmiseGo',
      'url': './assets/omisego.png'
    },
    {
      'key': 'qtum',
      'name': 'Qtum',
      'url': './assets/qtum.png'
    },
    {
      'key': 'gnt',
      'name': 'Golem',
      'url': './assets/golem.png'
    }
  ];

  constructor(private _sharedService: SharedServiceService) { }

  ngOnInit() {
  }

  getSelectedCoin = (coin) => {
    this.coinClicked.emit(coin);
    this._sharedService.setCoinKey(coin.key);
    // this.state[coin.key] = this.state[coin.key] === 'inactive' ? 'active' : 'inactive';
    // this.state[coin.key] = 'active';
  }

  toggleState() {
  }
}
