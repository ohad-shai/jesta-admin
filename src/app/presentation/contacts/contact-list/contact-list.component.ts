import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ManagerModel } from 'src/app/domain/models/manager.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts!: Array<ManagerModel>;
  tableColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  tableDataSource = new MatTableDataSource(this.contacts);

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | יצירות קשר');
    this.tableDataSource.sort = this.sort;

    // TODO: get from API:
    this.contacts = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];
  }

}