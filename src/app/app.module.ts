import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, Ng2ImgMaxModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
