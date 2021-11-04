import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxBasicSplitterDirective } from './ngx-splitter.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [NgxBasicSplitterDirective],
  bootstrap: [],
  exports: [NgxBasicSplitterDirective],
})
export class NgxBasicSplitterModule {}
