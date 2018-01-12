import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from './shared-service.service'

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.less'],
  providers: ['SharedService']
})
export class LeftNavComponent implements OnInit {
  @Output() selectedCoin = new EventEmitter<string>();
  coinList: Array<any> = [
    {
      'key': 'btc',
      'name': 'Bit Coin'
    },
    {
      'key': 'rip',
      'name': 'Ripple'
    }
  ];
  // selectedCoin = {};

  constructor( private _sharedService: SharedService) { }

  ngOnInit() {
  }

  getSelectedCoin = (coin : string) => {
    // this.selectedCoin = coin;
    this.selectedCoin.emit(coin);
    this._sharedService.getCoinKey(coin.key);
    console.log(coin, 'got selectedd>>>>');
  }
}
