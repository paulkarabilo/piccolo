import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';

import { MdToolbarModule, MdInputModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { URLService } from './services/URLService';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdInputModule
  ],
  providers: [URLService],
  bootstrap: [AppComponent]
})
export class Piccolo {

}
