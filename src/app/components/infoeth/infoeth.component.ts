import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-infoeth',
  templateUrl: './infoeth.component.html',
  styleUrls: ['./infoeth.component.css']
})
export class InfoethComponent implements OnInit {

  chart = [];

  constructor(private _chart: ChartService) { }

  ngOnInit() {

    this._chart.dailyEthPrice()
      .subscribe(res => {
        console.log(res)

        let ethPrice = res['Data'].map(res => res.close)
        let alldates = res['Data'].map(res => res.time)
        
        console.log(ethPrice);
        console.log(alldates);

        let ethDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          ethDates.push(jsdate.toLocaleTimeString( 'en', { year: 'numeric', month:'numeric', day: 'numeric'}))
        })
        console.log(ethDates)

        this.chart = new Chart( 'canvas' , {
          type: 'line',
          data: {
            labels: ethDates,
            datasets:[
              {
                data: ethPrice,
                borderColor:'#3cba9f',
                fill: true
              }
            ]
           },
           options: {
             legend:{
               display: false
             },
             scales:{
               xAxes:[{
                 display: true
               }],
               yAxes:[{
                 display: true
               }]
             }
           }
         });

      })
  }

}
