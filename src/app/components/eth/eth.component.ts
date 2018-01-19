import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';
import { DataSource } from '@angular/cdk/collections';
import { CryptoService } from '../../services/crypto.service';
import { BackendService } from '../../services/backend.service';
import { WalletService } from '../../services/wallet.service';
import { HoldingService } from '../../services/holding.service';
import { WalletTransaction } from '../../models/WalletTransaction';
import { TransactionDataSource } from '../btc/btc.component';

@Component({
  selector: 'app-eth',
  templateUrl: './eth.component.html',
  styleUrls: ['./eth.component.css']
})

export class EthComponent implements OnInit {
  displayedColumns = ['price', 'cryptoTransactionAmount', 'marketValue', 'transactionDate']
  chart = [];
  holdingId: number;
  availableFunds: number;
  ethereumTotal: number;
  currencyPrice: number;
  totalValue: number = 0;
  dataSource: DataSource<any> | null;
  cryptos: any;
  cryptoPrice: number;

  constructor(private _chart: ChartService, private _crypto: CryptoService, private _backend: BackendService, private _wallet: WalletService, private _holding: HoldingService) { }

  ngOnInit() {
    this._crypto.getEthPrice()
    .subscribe(res => {
      this.cryptos = res;
      this.cryptoPrice = res['ETH']['USD']
    })

    this._crypto.getEthPrice().subscribe(result => this.currencyPrice = result["ETH"]["USD"])
    this._backend.getWallet().subscribe(value => this.availableFunds = value['WalletBalance'])
    this._holding.getHoldingByCurrencyId(2).subscribe(result => {
      this._holding.getHolding(result[1]["HoldingId"]).subscribe(value => {
        this.ethereumTotal = value[1]["CryptoHoldingBalance"]
        this.totalValue = this.currencyPrice * this.ethereumTotal
        console.log(this.currencyPrice)
        console.log(this.ethereumTotal)
      })
      this._holding.getHoldingTransactions(result[1]["HoldingId"]).subscribe((wt: WalletTransaction[]) => {
        wt.forEach(t => {
          t.Price = t.MarketValue * t.CryptoTransactionAmount
        })
        this.dataSource = new TransactionDataSource(wt)
      })
    })
    this._chart.dailyEthPrice()
      .subscribe(res => {
        let ethPrice = res['Data'].map(res => res.close)
        let alldates = res['Data'].map(res => res.time)

        let ethDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          ethDates.push(jsdate.toLocaleTimeString( 'en', { year: 'numeric', month:'numeric', day: 'numeric'}))
        })
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
