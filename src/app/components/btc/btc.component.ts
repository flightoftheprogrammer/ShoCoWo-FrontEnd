import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})

export class BtcComponent implements OnInit {
  
  chart = [];

  constructor(private _chart: ChartService) {}

  ngOnInit() {
    this._chart.dailyBtcPrice()
      .subscribe(res => {
        this.chart = [];

        Object.keys(res['bpi']).forEach( eachDate => {
          this.chart.push({
            date: eachDate,
            value: res['bpi'][eachDate]
          });
        });

        let priceArray =  []
          this.chart.forEach(x => {
            priceArray.push(x['value'])
          });
        
        let dateArray = []
          this.chart.forEach(x => {
            dateArray.push(x['date'])
          });
        
        this.chart = new Chart( 'canvas' , {
          type: 'line',
          data: {
            labels: dateArray,
            datasets:[
              {
                data: priceArray,
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
      });
    
  }
}
