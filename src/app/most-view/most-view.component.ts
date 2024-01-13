import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StockPriceService } from '../services/stock-price.service';

export interface MostView {
  symbol: string;
  countView: number;
}
@Component({
  selector: 'app-most-view',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './most-view.component.html',
  styleUrl: './most-view.component.css',
  providers: [DatePipe]
})
export class MostViewComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['symbol', 'countView'];
  dataSource!: MatTableDataSource<MostView>;
  mostView: MostView[] = []
  currentDate: String = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private stockService: StockPriceService, private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.fetchData('20');
    console.log(this.currentDate);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchData(timestamp: String) {
    this.stockService.getMostView(timestamp).subscribe((data: any) => {
      this.mostView = []
      console.log(timestamp)
      data.map((view: any) => this.mostView.push({symbol: view[0], countView: view[1]}))
      this.dataSource = new MatTableDataSource(this.mostView);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
