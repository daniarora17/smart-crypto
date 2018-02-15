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
  }

  private getbestBuyPrice(res) {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    res.map((data) => {
      if (data.buy < lowest) {
        lowest = data.buy;
        return this.bestBuy = data;
      }
      if (data.sell > highest) {
        highest = data.sell;
        // console.log(highest, 'highessttt>>>');
        return this.bestSell = data;
      }
    });
  }

}
