import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
  pluck,
  first,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
  renderPokemon,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/';

const searchPokemon = (searchTerm) => {
  return fromFetch(endpoint + 'search/' + searchTerm).pipe(
    mergeMap((response) => response.json()),
  );
};

const getPokemonData = (pokemon) => {
  return fromFetch(endpoint + pokemon.id).pipe(
    mergeMap((response) => response.json()),
  );
};

const search$ = fromEvent(form, 'submit').pipe(
  map(() => search.value),
  switchMap(searchPokemon),
  pluck('pokemon'),
  mergeMap((pokemon) => pokemon),
  first(),
  switchMap((pokemon) => {
    const pokemon$ = of(pokemon);
    const additionalData$ = getPokemonData(pokemon).pipe(
      map((data) => ({
        ...pokemon,
        data,
      })),
    );
    return merge(pokemon$, additionalData$);
  }),
  tap(renderPokemon),
);

const oldSearch$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((event) => event.target.value),
  distinctUntilChanged(),
  switchMap((searchTerm) => {
    return fromFetch(endpoint + searchTerm + '?delay=100&chaos=true').pipe(
      mergeMap((response) => response.json()),
    );
  }),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults),
);

search$.subscribe(console.log);
