import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyService } from '../../services/currency.service';

import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HoldingService } from '../../services/holding.service';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-wallet',
  providers: [BackendService, 
              CurrencyService],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _backend: BackendService, private _walletService: WalletService, private _holding: HoldingService, private _crypto: CryptoService) { }

  walletBalance: number;
  totalBitcoin: number;
  currentBitcoinValue: number;
  totalEthereum: number;
  currentEthereumValue: number;
  walletTransactions: any;

  ngOnInit() {
    this.getWalletTransactions()
    this._backend.getWallet().subscribe(value => this.walletBalance = value["WalletBalance"])
    this.getTotalBitcoin()
    this.getTotalEthereum()
    this.getBitcoinValue()
    this.getBitcoinValue()
    this.getEthereumValue()
  }
  
  getWalletTransactions() {
    this._backend.getWalletTransaction().subscribe(value => this.walletTransactions = value)
  }

  addWalletTransaction(amount: number) {
    this._backend.postWalletTransaction(amount).subscribe(value => console.log(value))
  }

  getTotalBitcoin() {
    this._holding.getHoldingByCurrencyId(1).subscribe(value => this.totalBitcoin = value["CryptoHoldingBalance"])
  }

  getBitcoinValue() {
    this._crypto.getBtcPrice().subscribe(value => this.currentBitcoinValue = value["BTC"]["USD"])
  }

  getTotalEthereum() {
    this._holding.getHoldingByCurrencyId(2).subscribe(value => this.totalEthereum = value["CryptoHoldingBalance"])
  }

  getEthereumValue() {
    this._crypto.getEthPrice().subscribe(value => this.currentEthereumValue = value["ETH"]["USD"])
  }
}
