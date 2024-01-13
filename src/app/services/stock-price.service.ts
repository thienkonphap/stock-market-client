import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
    private baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey='
    constructor(private http: HttpClient) {}

    getStockPrice(symbol: String) {
        let apiKey = 'KXG4L563UAPZLZ2X'
        return this.http.get(`http://localhost:52001/visite/daily-price/${symbol}`);
    }
    getOverview(symbol: String) {  
        return this.http.get(`http://localhost:52001/visite/overview/${symbol}`);
    }
    getMostView(timestamp: String) {
        return this.http.get(`http://localhost:52001/visite/most-frequently-view/${timestamp}`);
    }
}