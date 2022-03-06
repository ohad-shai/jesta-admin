import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { PresentationModule } from './presentation/presentation.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DataModule,
    PresentationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
