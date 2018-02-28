import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-price',
  templateUrl: './best-price.component.html',
  styleUrls: ['./best-price.component.less']
})
export class BestPriceComponent implements OnChanges, OnInit {
  @Input() data: any[];
  tableData: any = [];
  bestBuy: any;
  bestSell: any;

  constructor() { }

  ngOnInit() {
    this.getbestPrice(this.data);
  }

  ngOnChanges(changes) {
    if (changes.data.previousValue) {
      this.tableData = changes.data.currentValue;
      this.getbestPrice(this.tableData);
    }
  }

  private getbestPrice(res) {
    const bestBuy: Number = Math.min.apply(Math, res.map(function (o) { return o.buy; }));
    const bestSell: Number = Math.max.apply(Math, res.map(function (o) { return o.sell; }));
    res.filter((data) => {
      if (parseFloat(data.buy) === bestBuy) {
        return this.bestBuy = data;
      }
    });
    res.filter((data) => {
      if (parseFloat(data.sell) === bestSell) {
        return this.bestSell = data;
      }
    });
  }
}

