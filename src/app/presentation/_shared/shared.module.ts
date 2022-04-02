import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { IfScreenDirective } from './directives/if-screen.directive';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorHebrew } from './components/mat-paginator-hebrew';
import { BasicListPageComponent } from './components/basic-list-page/basic-list-page.component';
import { BasicItemPageComponent } from './components/basic-item-page/basic-item-page.component';

@NgModule({
  declarations: [
    LayoutComponent,
    IfScreenDirective,
    BasicListPageComponent,
    BasicItemPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutComponent,
    IfScreenDirective,
    BasicListPageComponent,
    BasicItemPageComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorHebrew }
  ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}
