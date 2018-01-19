import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyService } from '../../services/currency.service';

import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-wallet',
  providers: [BackendService, CurrencyService],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent implements OnInit, AfterViewInit {
  wallet
  constructor(private route: ActivatedRoute, private _backend: BackendService, private _currency: CurrencyService,
    private WalletService: WalletService) { }

  ngOnInit() {
    this.wallet = this.route.snapshot.data["wallet"];
  }

  ngAfterViewInit() { }

  getWallet() {
    this._backend.getWallet().subscribe(
      value => {
        console.log('We got an value from the backend!');
        console.log('That value is:');
        console.log(value);
      },
      err => { console.log('Error in subscription:'); console.log(err); },
      () => console.log('Subscription completed!')
    )
  }

  addNumber() {
    this._backend.updateWalletBalance(3.5).subscribe(value => console.log(value))
  }

  getWalletTransactions() {
    this._backend.getWalletTransaction().subscribe(
      value => {
        console.log('We got an value from the backend!');
        console.log('That value is:');
        console.log(value);
      },
      err => { console.log('Error in subscription:'); console.log(err); },
      () => console.log('Subscription completed!')
    )
  }

  addWalletTransaction(amount: number) {
    this._backend.postWalletTransaction(amount).subscribe(value => console.log(value))
  }

  getWalletTransaction(id: number) {
    this._backend.getWalletTransactionById(id).subscribe(value => console.log(value))
  }

  postCurrency(currencyNameLong: string, currencyNameShort: string) {
    this._currency.addCurrency(currencyNameLong, currencyNameShort).subscribe(value => console.log(value))
  }

  getCurrencies() {
    this._currency.getCurrencies().subscribe(
      value => {
        console.log('We got an value from the backend!');
        console.log('That value is:');
        console.log(value);
      },
      err => { console.log('Error in subscription:'); console.log(err); },
      () => console.log('Subscription completed!')
    )
  }

  getCurrency(id: number) {
    this._currency.getCurrencyId(id).subscribe(value => console.log(value))
  }
}
