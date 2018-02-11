import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-best-price',
  templateUrl: './best-price.component.html',
  styleUrls: ['./best-price.component.less']
})
export class BestPriceComponent implements OnChanges {
  @Input() data: any[];
  tableData: any[];
  bestBuy: any[];
  bestSell: any[];

  constructor() { }

  ngOnChanges(changes) {
    this.tableData = changes.data.currentValue;
    this.getbestBuyPrice(this.tableData);
    console.log(this.bestBuy, 'best buyyy>>>');
    console.log(this.bestSell, 'best sellllll>>>');
  }

  private getbestBuyPrice(res) {
    let lowest = Number.POSITIVE_INFINITY;
    res.map((data) => {
      if (data.buy < lowest) {
        lowest = data.buy;
        return this.bestBuy = data;
      }
      if (data.sell < lowest) {
        lowest = data.sell;
        return this.bestSell = data;
      }
    });
  }

}
