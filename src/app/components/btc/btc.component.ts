import { Wallet } from './../../models/wallet';
import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Observable }from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { WalletService } from '../../services/wallet.service';



@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})

export class BtcComponent implements OnInit {
     displayedColumns = ['price', 'cryptoAmount', 'marketValue', 'transactionDate'];
  chart = [];
  dataSource : DataSource<any> | null;
  constructor(private _chart: ChartService, private _wallet: WalletService) {}

  ngOnInit() {
    this._wallet.getWallet().subscribe((Wallet: Wallet[])=>{
    this.dataSource = new TransactionDataSource(Wallet);
    });

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

export class TransactionDataSource extends DataSource<any> {
  constructor(private walletData: Wallet[]){
    super();
  }
  connect(): Observable<Wallet[]> {
    return Observable.of(this.walletData);
  }
  disconnect() { }
}