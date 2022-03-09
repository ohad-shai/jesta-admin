import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../core/guards/module-import.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  exports: [

  ]
})
export class DomainModule {
  constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
    throwIfAlreadyLoaded(parentModule, 'DomainModule');
  }
}