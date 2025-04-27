import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CityCost } from '../models/city-cost.model';

@Injectable({ providedIn: 'root' })
export class CityDataService {
  private readonly url = 'assets/city-cost-index.json';

  constructor(private http: HttpClient) {}

  /** Returns the list of German cities with cost-of-living index */
  list(): Observable<CityCost[]> {
    return this.http.get<CityCost[]>(this.url).pipe(
      shareReplay(1) // cache for all subscribers
    );
  }
}
