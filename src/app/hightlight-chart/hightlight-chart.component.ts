import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule} from 'angular-highcharts';
import * as Highcharts from 'highcharts/highstock';
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
import { HighchartsChartModule } from "highcharts-angular";
import { FormsModule } from "@angular/forms";
import { StockChart } from 'angular-highcharts';
import { StockPriceService } from '../services/stock-price.service';
import { time } from 'console';
@Component({
  selector: 'app-hightlight-chart',
  standalone: true,
  imports: [ChartModule,FormsModule, HighchartsChartModule],
  templateUrl: './hightlight-chart.component.html',
  styleUrl: './hightlight-chart.component.css'
})
export class HightlightChartComponent implements OnInit {
  constructor(private stockService: StockPriceService) {}
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
  formattedData:any[]=  []
  stock: StockChart = new StockChart({
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [{
      tooltip: {
        valueDecimals: 2
      },
      name: 'AAPL',
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


  ngOnInit(): void {
    this.stockService.getStockPrice('IBM').subscribe((data: any) => {
      const timeSeries = data["Time Series (Daily)"];
      for (const date in timeSeries) {
        const entry = timeSeries[date];
        const formattedEntry = [
          new Date(date).getTime(), parseFloat(entry["1. open"]), parseFloat(entry["2. high"]), parseFloat(entry["3. low"]), parseFloat(entry["4. close"])
        ]
        this.formattedData.push(formattedEntry);
      }
      this.formattedData = this.formattedData.reverse();
   }
   );
  }
}
