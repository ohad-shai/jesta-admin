import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html'
})
export class SettingListComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | הגדרות מערכת');
  }

}
