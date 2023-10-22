import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SomeListComponent } from './some-list/some-list.component';
import { OneBindingEntryComponent } from './some-list/one-binding-entry/one-binding-entry.component';
import { EveryPropertyBindingEntryComponent } from './some-list/every-property-binding-entry/every-property-binding-entry.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SomeListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
