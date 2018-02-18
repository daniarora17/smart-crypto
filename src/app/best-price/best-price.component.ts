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
    this.getbestPrice(this.tableData);
  }

  private getbestPrice(res) {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    res.map((data) => {
      if (data.buy < lowest) {
        lowest = data.buy;
        return this.bestBuy = data;
      }
      if (data.sell > highest) {
        highest = data.sell;
        return this.bestSell = data;
      }
    });
  }

}
