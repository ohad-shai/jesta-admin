import { Component, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { ScreenUtil } from '../utilities/screen.util';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isSidenavOpened = true;
  currentUserFirstName?= '';
  @ViewChild('toolbar', { static: true }) toolbar!: MatToolbar;
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(
    public screenUtil: ScreenUtil,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.updateSideNavState();
    this.currentUserFirstName = this.authService.getCurrentUser()?.firstName;
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

}
