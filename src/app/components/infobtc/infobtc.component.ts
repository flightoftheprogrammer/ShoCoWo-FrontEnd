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
         console.log(res.bpi);

        var response = res.bpi;
        //  let btcHistory = res['bpi.json'].map(res => res.bpi)
         console.log('attempt: ' Array.from(response));
        // console.log(btcHistory);

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
