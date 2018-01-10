import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})
export class BtcComponent implements OnInit {

  constructor(private _chart: ChartService) {}

  ngOnInit() {
    this._chart.dailyBtcPrice()
       .subscribe(res => {
         console.log(res)
 
         let temp_max = res['list'].map(res => res.main)
       })
   }
}
