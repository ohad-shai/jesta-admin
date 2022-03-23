import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TempModel } from 'src/app/data/models/temp.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html'
})
export class ReportListComponent implements OnInit {

  reports!: Array<TempModel>;
  tableColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  tableDataSource = new MatTableDataSource(this.reports);

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('ג\'סטה | ניהול | דיווחים');
    this.tableDataSource.sort = this.sort;

    // TODO: get from API:
    this.reports = [
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
