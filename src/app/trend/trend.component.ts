import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CompaniesInfoService } from '../services/companies-info.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Company } from '../models/company.model';
import * as Papa from 'papaparse';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
export interface CompanyData {
    symbol: string,
    security: string,
    sector: string,
    sub_industry: string,
    headquarters: string,
    date_added: string,
    cik: string,
    founded: string
}

@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, CommonModule],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.css'
})
export class TrendComponent implements AfterViewInit, OnInit{

  companiesData: Company[] = []

  displayedColumns: string[] = ['symbol','security','sector','sub_industry','headquarters','date_added','cik','founded'];
  dataSource!: MatTableDataSource<CompanyData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private companiesService: CompaniesInfoService) {

    // Create 100 users
    let papaData: Company[] = []
    let companiesDataInterFace: CompanyData[] = []

  }
  ngOnInit(): void {
   this.fetch();
  }
  ngAfterViewInit() {
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
  fetch() {
    let papaData: Company[] = []
    let companiesDataInterFace: CompanyData[] = []
    this.companiesService.fetchCompaniesInfo().subscribe(
      (data) => {
        // You can now use this.companiesData in your template or other parts of the component
        Papa.parse(data, { // Parse csv data 
          complete: (result) => { 
            papaData = result.data.map((companyData: any)=> new Company(companyData[0], companyData[1], companyData[2], companyData[3], companyData[4], companyData[5], companyData[6], companyData[7]))
            this.companiesData = papaData.slice(1)
          }
        })
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    const companyDataList: CompanyData[] = this.companiesData.map(convertCompanyToCompanyData);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(companyDataList);
  }

}
function convertCsvToCompanyList(csvText: string): Company[] {
  const lines = csvText.split('\n');
  const headers = ['symbol', 'security', 'sector', 'sub_industry', 'headquarters', 'date_added', 'cik', 'founded']

  const companyList: Company[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');

    const company: any = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = values[j];

      company[header] = value;
    }
    companyList.push(company);
  }

  return companyList;
}
function convertCompanyToCompanyData(company: Company): CompanyData {
  const companyData: CompanyData = {
    symbol: company.symbol,
    security: company.security,
    sector: company.sector,
    sub_industry: company.sub_industry,
    headquarters: company.headquarters,
    date_added: company.date_added,
    cik: company.cik,
    founded: company.founded,
  };
  return companyData;
}
