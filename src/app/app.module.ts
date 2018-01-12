import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { 
  MatToolbarModule, 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, 
  MatCardModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { InfobtcComponent } from './components/infobtc/infobtc.component';
import { InfoethComponent } from './components/infoeth/infoeth.component';
import { BtcComponent } from './components/btc/btc.component';
import { BuyBtcComponent } from './components/btc/buy/buy.component';
import { SellBtcComponent } from './components/btc/sell/sell.component';
import { BtcTransactionsComponent } from './components/btc/transactions/transactions.component';
import { EthComponent } from './components/eth/eth.component';
import { SellEthComponent } from './components/eth/sell/sell.component';
import { BuyEthComponent } from './components/eth/buy/buy.component';
import { EthTransactionsComponent } from './components/eth/transactions/transactions.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { HoldingsComponent } from './components/wallet/holdings/holdings.component';
import { TransactionsComponent } from './components/wallet/transactions/transactions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthService } from './services/auth.service';
import { prepareProfile } from 'selenium-webdriver/firefox';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guards';
import { CryptoService } from './services/crypto.service';
import { ChartService } from './services/chart.service';


const routes = [
  { path: 'home', component:HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'infobtc', component: InfobtcComponent },
  { path: 'infoeth', component: InfoethComponent },
  { 
    path: 'btc', children: [
      { path: '', component: BtcComponent },
      { path: 'buy', component: BuyBtcComponent},
      { path: 'sell', component: SellBtcComponent},
      { path: 'transactions', component: BtcTransactionsComponent},
    ]
  },
  { 
    path: 'eth', canActivate: [AuthGuard] , children: [
      { path: '', component: EthComponent },
      { path: 'buy', component: BuyEthComponent},
      { path: 'sell', component: SellEthComponent},
      { path: 'transactions', component: EthTransactionsComponent},
    ]
  },
  { 
    path: 'wallet', canActivate: [AuthGuard] , children: [
     { path: '', component: WalletComponent},
     { path: 'holdings', component:HoldingsComponent},
     { path: 'transactions', component:TransactionsComponent},
    ]
  },
  { path: 'profile',  component: ProfileComponent},
  { path: '**', component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    InfobtcComponent,
    InfoethComponent,    
    BtcComponent,
    EthComponent,
    WalletComponent,
    ProfileComponent,
    FooterComponent,
    WelcomeComponent,
    BuyBtcComponent,
    SellBtcComponent,
    BtcTransactionsComponent,
    BuyEthComponent,
    SellEthComponent,
    EthTransactionsComponent,
    TransactionsComponent,
    HoldingsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpModule
  ],
  providers: [
    AuthService,
    ChartService,
    CryptoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
