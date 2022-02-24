import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
  ]
})
export class SharedModule { }
