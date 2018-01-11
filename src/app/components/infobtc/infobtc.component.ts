import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-infobtc',
  templateUrl: './infobtc.component.html',
  styleUrls: ['./infobtc.component.css']
})
export class InfobtcComponent implements OnInit {

  chart = [];

  constructor(private _chart: ChartService) {}

  ngOnInit() {
    this._chart.dailyBtcPrice()
       .subscribe(res => {
         console.log(res);
      

      })
    }
}



        //  this.chart = new Chart('canavas', {
        //    type: 'line',
        //    data: {
        //      labels: btcHistory
        //      datasets:[
        //        {
        //          data: btcHistory,
        //          borderColor:'#3cba9f',
        //          fill: false
        //        },
        //      ]
        //    }
        //  })
//        })
//    }
// }
