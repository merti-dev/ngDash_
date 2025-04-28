/**********************************************************************************************
 *  CostStateService
 *  ----------------
 *  • Central, RxJS-powered application state
 *  • Holds gross salary, savings target, currently-selected city
 *  • Exposes derived streams: netMonthly$ & requiredNet$
 *********************************************************************************************/

import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CityCost } from '../models/city-cost.model';
import { CityDataService } from './city-data.service';

import { approxNet2025 } from '../utils/net-approx';
import { requiredNetSalary } from '../utils/cost-helpers';

@Injectable({ providedIn: 'root' })
export class CostStateService {
  /* ───────────────────────────── raw state ───────────────────────────── */

  private readonly grossAnnual$  = new BehaviorSubject<number>(46_000); // €/year (gross)
  private readonly savings$      = new BehaviorSubject<number>(600);    // €/month
  readonly selectedCity$ = new BehaviorSubject<CityCost | null>(null);

  /* ──────────────────────── injected & constructor ───────────────────── */

  /** List of all cities (shared replay); assigned in ctor to satisfy strict mode */
  readonly cities$!: Observable<CityCost[]>;

  constructor(private cityData: CityDataService) {
    this.cities$ = this.cityData.list().pipe(shareReplay(1));
  }

  /* ─────────────────────────── derived state ─────────────────────────── */

  /** Current net salary per month (auto-recalculated when gross changes) */
  readonly netMonthly$ = this.grossAnnual$.pipe(
    map(gross => approxNet2025(gross) / 12),
    shareReplay(1)
  );

  /** Required net salary in selected city to keep same purchasing power */
  readonly requiredNet$ = combineLatest([
    this.netMonthly$, this.savings$, this.selectedCity$
  ]).pipe(
    map(([net, save, city]) =>
      city ? requiredNetSalary(net, save, city.index) : null
    ),
    shareReplay(1)
  );

  /* ───────────────────────────── mutators ───────────────────────────── */

  /** Update annual gross salary (in €). */
  setGrossAnnual(value: number): void {
    this.grossAnnual$.next(value);
  }

  /** Update monthly savings target (in €). */
  setSavings(value: number): void {
    this.savings$.next(value);
  }

  /** Select a city via Map click or any CityCost object. */
  selectCity(city: CityCost): void {
    this.selectedCity$.next(city);
  }

  /** Convenience: select a city just by its name. */
  selectCityByName(name: string): void {
    this.cities$
      .pipe(
        map(list => list.find(c => c.city === name) ?? null),
        take(1)
      )
      .subscribe(city => this.selectedCity$.next(city));
  }
}
