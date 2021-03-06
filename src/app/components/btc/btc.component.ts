import { CryptoService } from './../../services/crypto.service';
import { WalletTransaction } from './../../models/WalletTransaction';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Chart } from 'chart.js';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { WalletService } from '../../services/wallet.service';
import { HoldingService } from '../../services/holding.service';



@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})

export class BtcComponent implements OnInit {
  displayedColumns = ['price', 'cryptoTransactionAmount', 'marketValue', 'transactionDate'];
  chart = [];
  holdingId: number;
  availableFunds: number;
  bitcoinTotal: number;
  currencyPrice: number;
  dataSource: DataSource<any> | null;
  cryptos: any;
  cryptoPrice: number;

  constructor(private _data: CryptoService, private _chart: ChartService, private _wallet: WalletService, private _holding: HoldingService, private _backend: BackendService) { }

  ngOnInit() {
    this._data.getBtcPrice()
    .subscribe(res => {
      this.cryptos = res;
      this.cryptoPrice = res["BTC"]["USD"];
    })
    this.getWalletBalance()
    this.getHolding()
    this.getTableData(this.holdingId)
    this._data.getBtcPrice().subscribe(result => this.currencyPrice = result["BTC"]["USD"])
    this._chart.dailyBtcPrice()
      .subscribe(res => {
        this.chart = [];

        Object.keys(res['bpi']).forEach(eachDate => {
          this.chart.push({
            date: eachDate,
            value: res['bpi'][eachDate]
          });
        });

        let priceArray = []
        this.chart.forEach(x => {
          priceArray.push(x['value'])
        });

        let dateArray = []
        this.chart.forEach(x => {
          dateArray.push(x['date'])
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dateArray,
            datasets: [
              {
                data: priceArray,
                borderColor: '#3cba9f',
                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      });

  }

  getWalletBalance() {
    this._backend.getWallet().subscribe(value => this.availableFunds = value['WalletBalance'])
  }

  getHolding() {
    this._holding.getHoldingByCurrencyId(1).subscribe(result => {
      this.bitcoinTotal = result["CryptoHoldingBalance"]
      this.holdingId = result["HoldingId"]
      this.getTableData(result["HoldingId"])
    })
  }

  getTableData(holdingId: number) {
    this._holding.getHoldingTransactions(holdingId).subscribe((wt: WalletTransaction[]) => {
      wt.forEach(t => {
        t.Price = t.MarketValue * t.CryptoTransactionAmount
      })
      this.dataSource = new TransactionDataSource(wt)
    })
  }
}

export class TransactionDataSource extends DataSource<any> {
  constructor(private walletData: WalletTransaction[]) {
    super();
  }
  connect(): Observable<WalletTransaction[]> {
    return Observable.of(this.walletData);
  }
  disconnect() { }
}