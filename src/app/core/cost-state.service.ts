/**********************************************************************************************
 *  CostStateService – central reactive state container
 *********************************************************************************************/

import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, take } from 'rxjs';

import { CityCost } from '../models/city-cost.model';
import { CityDataService } from './city-data.service';
import { approxNet2025 } from '../utils/net-approx';
import { requiredNetSalary } from '../utils/cost-helpers';

@Injectable({ providedIn: 'root' })
export class CostStateService {
  /* raw state */
  private readonly grossAnnualSub  = new BehaviorSubject<number>(46_000);
  private readonly savingsSub      = new BehaviorSubject<number>(600);
  private readonly selectedCitySub = new BehaviorSubject<CityCost | null>(null);

  /* public observables */
  readonly gross$        = this.grossAnnualSub.asObservable();
  readonly savings$      = this.savingsSub.asObservable();
  readonly selectedCity$ = this.selectedCitySub.asObservable();
  readonly cities$: Observable<CityCost[]>;

  readonly netMonthly$ = this.gross$.pipe(
    map(g => approxNet2025(g) / 12),
    shareReplay(1)
  );

  readonly requiredNet$ = combineLatest([
    this.netMonthly$,
    this.savings$,
    this.selectedCity$
  ]).pipe(
    map(([net, save, city]) =>
      city ? requiredNetSalary(net, save, city.index) : null
    ),
    shareReplay(1)
  );

  /* persistence keys */
  private readonly LS_GROSS   = 'col:grossAnnual';
  private readonly LS_SAVINGS = 'col:savings';

  constructor(private cityData: CityDataService) {
    /* cache city list */
    this.cities$ = this.cityData.list().pipe(shareReplay(1));

    /* restore persisted values */
    const g = Number(localStorage.getItem(this.LS_GROSS));
    const s = Number(localStorage.getItem(this.LS_SAVINGS));
    if (!Number.isNaN(g)) this.grossAnnualSub.next(g);
    if (!Number.isNaN(s)) this.savingsSub.next(s);
  }

  /* mutators */
  setGrossAnnual(v: number): void {
    this.grossAnnualSub.next(v);
    localStorage.setItem(this.LS_GROSS, v.toString());
  }

  setSavings(v: number): void {
    this.savingsSub.next(v);
    localStorage.setItem(this.LS_SAVINGS, v.toString());
  }

  selectCity(c: CityCost): void { this.selectedCitySub.next(c); }

  selectCityByName(name: string): void {
    this.cities$.pipe(
      map(list => list.find(c => c.city === name) ?? null),
      take(1)
    ).subscribe(c => this.selectedCitySub.next(c));
  }
}
