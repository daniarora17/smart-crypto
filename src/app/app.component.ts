import { Component, OnInit, ViewChild } from '@angular/core';
import { LeftNavComponent } from './left-nav/left-nav.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild(LeftNavComponent)
  private leftNav: LeftNavComponent;
  selectedCoinKey: string;
  ngOnInit() {
    this.selectedCoinKey = 'btc';
  }

  coinClicked(key: any) {
    return this.selectedCoinKey = key.key;
  }
}
