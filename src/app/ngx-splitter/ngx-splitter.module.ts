import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxSplitterComponent } from './ngx-splitter.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [NgxSplitterComponent],
  bootstrap: [],
  exports: [NgxSplitterComponent],
})
export class NgxSplitterModule {}
