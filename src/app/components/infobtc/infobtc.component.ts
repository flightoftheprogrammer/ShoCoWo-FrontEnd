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
        this.chart = [];
        console.log(res['bpi']);
        
        Object.keys(res['bpi']).forEach( eachDate => {
          // console.log('eachDate is:')
          // console.log(eachDate)
          // console.log('and the value is:')
          // console.log(res['bpi'][eachDate])
          this.chart.push({
            date: eachDate,
            value: res['bpi'][eachDate]
          });
        })
         //this.chart.forEach(x => {
            // console.log(x['date'])
            // console.log(x['value'])
          //})

          let priceArray =  []
            this.chart.forEach(x => {
              priceArray.push(x['value'])
            })

          console.log(priceArray)

          let dateArray = []
          this.chart.forEach(x => {
            dateArray.push(x['date'])
          })
          
          console.log(dateArray)
        
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



        // let values = Object.values(res);
        //   console.log('values:', values[0]);
        // let keys = Object.values(res['bpi']);
        //   console.log('keys:', keys[0]);
        // var allValuesFromObject = values
        //   .map( d => Object.values(d) )
        // var allKeysFromObject = keys
        //   .map( d => d )
        
        // console.log('here are values', allValuesFromObject[0]);
        // console.log('Here are keys', allKeysFromObject);

     
      })
  }
}
