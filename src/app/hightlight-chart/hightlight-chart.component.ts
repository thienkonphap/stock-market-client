import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule} from 'angular-highcharts';
import { HighchartsChartModule } from "highcharts-angular";
import { FormsModule } from "@angular/forms";
import { StockChart } from 'angular-highcharts';
import { StockPriceService } from '../services/stock-price.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hightlight-chart',
  standalone: true,
  imports: [ChartModule,FormsModule, HighchartsChartModule],
  templateUrl: './hightlight-chart.component.html',
  styleUrls: ['hightlight-chart.component.css']
})
export class HightlightChartComponent implements OnInit {
  constructor(private stockService: StockPriceService, private route: ActivatedRoute) {}
  // chart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Linechart'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Line 1',
  //       data: [1, 2, 4]
  //     }

  //   ]
  // } as any);
  symbol: String = '';
  formattedData:any[]=  []
  stock: any = {};
  overviewInfo: any = {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';
    this.stockService.getStockPrice(this.symbol).subscribe((data: any) => {
      console.log(data);
      const timeSeries = data["Time Series (Daily)"];
      for (const date in timeSeries) {
        const entry = timeSeries[date];
        const formattedEntry = [
          new Date(date).getTime(), parseFloat(entry["1. open"]), parseFloat(entry["2. high"]), parseFloat(entry["3. low"]), parseFloat(entry["4. close"])
        ]
        this.formattedData.push(formattedEntry);
      }
      this.formattedData = this.formattedData.reverse();
      console.log(this.formattedData);
   }, (error: any) => console.log(error)
   );
   this.stock = new StockChart({
    rangeSelector: {
      selected: 1
    },
    title: {
      text: this.symbol.toUpperCase() + ' Stock Price'
    },
    series: [{
      tooltip: {
        valueDecimals: 2
      },
      name: this.symbol,
      type: 'candlestick',
      data: this.formattedData
    }],
    plotOptions: {
      candlestick: {
        color: 'pink',
        lineColor: 'red',
        upColor: 'lightgreen',
        upLineColor: 'green'
      }
    },
  } as any);
  // Fetch Overview Company
  this.stockService.getOverview(this.symbol).subscribe((data: any) => {
    console.log(data);
    this.overviewInfo = data;
    console.log(this.overviewInfo);
    });
  }
}
