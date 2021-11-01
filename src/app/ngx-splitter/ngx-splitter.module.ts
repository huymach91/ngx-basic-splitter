import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxSplitterDirective } from './ngx-splitter.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [NgxSplitterDirective],
  bootstrap: [],
  exports: [NgxSplitterDirective],
})
export class NgxSplitterModule {}
