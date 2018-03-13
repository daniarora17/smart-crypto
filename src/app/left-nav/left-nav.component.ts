import { Component, OnInit, Output, EventEmitter, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.less']
})
export class LeftNavComponent implements OnInit {
  @Output() coinClicked = new EventEmitter<any>();
  selectedItem: String;
  selectedCoin: any;
  coinList: Array<any> = [
    {
      'key': 'btc',
      'name': 'BitCoin',
      'url': './assets/bit-coin.png'
    },
    {
      'key': 'xrp',
      'name': 'Ripple',
      'url': './assets/ripple.png'
    },
    {
      'key': 'ltc',
      'name': 'LiteCoin',
      'url': './assets/litecoin.png'
    },
    {
      'key': 'eth',
      'name': 'Ethereum',
      'url': './assets/eth.png'
    },
    {
      'key': 'bch',
      'name': 'BitCoin Cash',
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
    },
    {
      'key': 'dgb',
      'name': 'DigiByte',
      'url': './assets/digibyte.png'
    }
  ];

  constructor(private _sharedService: SharedServiceService, private elem: ElementRef) { }

  ngOnInit() {
    this.selectedItem = 'btc';
    this.selectedCoin = this.coinList[0];
  }

  getSelectedCoin = (coin) => {
    this.coinClicked.emit(coin);
    this._sharedService.setCoinKey(coin.key);
    this.selectedItem = coin.key;
    this.selectedCoin = coin;
  }
}
