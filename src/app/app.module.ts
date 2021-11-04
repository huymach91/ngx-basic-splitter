import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxBasicSplitterModule } from './ngx-splitter/ngx-splitter.module';

@NgModule({
  imports: [BrowserModule, FormsModule, NgxBasicSplitterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
