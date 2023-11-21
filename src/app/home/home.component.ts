import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  templateUrl: "home.component.html",
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  filterCities: string[] = [];
  housingService: HousingService = inject(HousingService);
  selectedCities: Set<string> = new Set();
  private debounceTimer: any;

  constructor() {
    // Fetch data and initialize filterCities
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
      this.updateFilterCities();
    });
  }

  updateFilterCities() {
    // Extract unique cities from the data
    this.filterCities = Array.from(new Set(this.housingLocationList.map(location => location.city)));
  }

  onInputChange(text: string) {
    clearTimeout(this.debounceTimer);

    // Set a new timer for 300 milliseconds
    this.debounceTimer = setTimeout(() => {
      this.filterResults(text);
    }, 1000);
  }

  filterResults(text: string) {
    if (!text && this.selectedCities.size === 0) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      const cityMatches = housingLocation?.city.toLowerCase().includes(text.toLowerCase());
      const nameMatches = housingLocation?.name.toLowerCase().includes(text.toLowerCase());

      return (text && (cityMatches || nameMatches)) || this.selectedCities.has(housingLocation.city);
    });
  }

  toggleCityFilter(city: string) {
    if (this.selectedCities.has(city)) {
      this.selectedCities.delete(city);
    } else {
      this.selectedCities.add(city);
    }

    this.filterResults('');
  }


}