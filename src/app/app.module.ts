import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() //global options


  ],

  providers: [{ provide: "baseUrl", useValue: "http://localhost:5500/api", multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
