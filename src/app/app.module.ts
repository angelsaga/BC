import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CovalentCommonModule,
  CovalentDialogsModule,
  CovalentMessageModule,
  CovalentChipsModule,
  CovalentLoadingModule   } from '@covalent/core';
import { SignupComponent } from './components/signup/signup.component';
/* import {MatInputModule, MatRadioModule, 
  MatButtonModule, MatIconModule} from '@angular/material'; */
  import {MatIconModule} from '@angular/material/icon';
  import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    //MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserInfoService } from "../providers/UserInfoService";

import { NetService } from "../providers/NetService";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { ToastService } from "../providers/ToastService";
import { JwtHelper } from "angular2-jwt";
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Page1Component } from './pages/page1/page1.component';
import { HomeComponent } from './pages/home/home.component';
import { FootComponent } from './pages/foot/foot.component';
import { NavComponent } from './pages/nav/nav.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SubscribeComponent,
    Page1Component,
    HomeComponent,
    FootComponent,
    NavComponent,
    Page2Component,
    Page3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    //InputTextModule, ButtonModule, DataTableModule, DialogModule,

    //MatInputModule,MatRadioModule,MatButtonModule,MatIconModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentChipsModule,
    CovalentMessageModule,
    CovalentLoadingModule,

    HttpModule, IonicStorageModule.forRoot(),
    FormsModule, ReactiveFormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
  ],
  providers: [
    UserInfoService,
    NetService,
    ToastService,
    JwtHelper
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
