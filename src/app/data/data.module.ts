import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../core/guards/module-import.guard';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from './graphql/graphql.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule
  ],
  declarations: [],
  exports: [],
})
export class DataModule {
  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    throwIfAlreadyLoaded(parentModule, 'DataModule');
  }
}