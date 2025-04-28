import { Component, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CostStateService } from '../core/cost-state.service';
import { CityCost } from '../models/city-cost.model';

@Component({
  standalone: true,
  selector: 'app-map',
  imports: [CommonModule, LeafletModule],
  template: `
    <div leaflet
         [leafletOptions]="options"
         [leafletLayers]="layers"
         class="map-container">
    </div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  options: L.MapOptions = {
    center: L.latLng(51.16, 10.45),   // Germany center
    zoom: 6,
    attributionControl: false
  };

  /** base-layer + marker-layers */
  layers: L.Layer[] = [];

  constructor(
    private state: CostStateService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const base = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '© OpenStreetMap' }
    );

    this.state.cities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(list => {
        const markers = list.map(c => this.mkMarker(c));
        this.layers = [base, ...markers];
      });
  }

  private mkMarker(city: CityCost): L.Marker {
    const icon = L.icon({
      iconUrl:   'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize:  [25, 41],
      iconAnchor:[12, 41]
    });
  
    return L.marker([city.lat, city.lng], { icon })
             .bindTooltip(city.city)
             .on('click', () => this.state.selectCity(city));
  }
  
}
