import { Injectable } from '@angular/core';

import {
    map,
    Observable,
    tap,
} from 'rxjs';

import * as data from '@assets/data/db.json';
import { uuid } from '@shared/utilities';

import { Hero } from '../interfaces';
import { HerosService } from './heros.service.base';

@Injectable()
export class MemoryHerosService implements HerosService {
  private readonly DATA = data;

  private initialized = false;
  private heros: Hero[] = [];

  getHeros(): Observable<Hero[]> {
    return this.listHeros();
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.listHeros()
      .pipe(
        map(heros => heros.find(hero => hero.id === id)),
      );
  }

  getSuggestions(query: string, limit: number = 5): Observable<Hero[]> {
    return this.listHeros()
      .pipe(
        map(heros => heros.filter(hero =>
          hero.superhero.toLowerCase().includes(query.toLowerCase())).slice(0, limit)
        ),
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    hero.id = uuid();
    return this.listHeros()
      .pipe(
        tap(heros => this.heros = [...heros, hero]),
        map(() => hero),
      );
  }

  updateHero(data: Hero): Observable<Hero|undefined> {
    if (!data.id) {
      throw new Error('Hero id is required');
    }
    return this.listHeros()
      .pipe(
        tap(heros => this.heros = this.heros.map((hero) => hero.id === data.id ? {hero, ...data} : hero)),
        map(() => this.heros.find(hero => hero.id === data.id)),
      );
  }

  deleteHero(id: string): Observable<boolean> {
    return this.listHeros()
      .pipe(
        tap(heros => this.heros = heros.filter(hero => hero.id !== id)),
        map(() => true),
      );
  }

  private listHeros(): Observable<Hero[]> {
    return new Observable<Hero[]>(observer => {
      this.initialize().then(() => {
        observer.next(this.heros);
        observer.complete();
      });
    });
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.heros = this.DATA.heros.map(hero => structuredClone(hero)) as Hero[];
    this.initialized = true;
  }
}
