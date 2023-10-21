import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SomeListComponent } from './some-list/some-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SomeListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
