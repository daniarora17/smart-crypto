import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})
export class DataTableComponent implements OnInit {

  constructor(private _sharedService: SharedServiceService) { }

  ngOnInit() {
    // console.log(this._sharedService.coinKey, 'coinnn keeyyy>>>');
  }

}
