import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    catchError,
    map,
    Observable,
    of,
} from 'rxjs';

import { environment } from '@environments/environment';

import { Hero } from '../interfaces';
import { HerosService } from './heros.service.base';

@Injectable()
export class ServerHerosService implements HerosService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getHeros(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heros`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heros/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string, limit: number = 5): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heros?q=${query}&_limit=${limit}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw new Error('Hero id is required');
    }
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heros/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    return this.httpClient.delete<Hero>(`${this.baseUrl}/heros/${id}`)
      .pipe(
        catchError(error => of(false)),
        map(resp => true)
      );
  }
}
