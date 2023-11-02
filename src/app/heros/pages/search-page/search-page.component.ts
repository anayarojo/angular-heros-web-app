import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces';
import { HerosService } from '../../services';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public selectedHero?: Hero;
  public heros: Hero[] = [];

  constructor(private herosService: HerosService) { }

  search(): void {
    const query: string = this.searchInput.value ?? '';
    this.herosService.getSuggestions(query)
      .subscribe(heros => this.heros = heros);
  }

  selectOption($event: MatAutocompleteSelectedEvent): void {
    if (!$event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = $event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
