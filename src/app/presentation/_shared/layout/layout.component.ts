import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { ScreenUtil } from '../utilities/screen.util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isSidenavOpened = true;
  @ViewChild('toolbar', { static: true }) toolbar!: MatToolbar;
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(public screenUtil: ScreenUtil) {
  }

  ngOnInit() {
    this.updateSideNavState();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSideNavState();
  }

  private updateSideNavState() {
    let toolbarHeight = (<HTMLElement>this.toolbar._elementRef.nativeElement).getBoundingClientRect().height;
    this.sidenav.fixedTopGap = toolbarHeight;
    this.isSidenavOpened = !this.screenUtil.isLowerThanSM();
  }

}
