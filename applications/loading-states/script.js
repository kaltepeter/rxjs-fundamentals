import { fromEvent, concat, of, race, timer } from 'rxjs';
import { tap, exhaustMap, delay, shareReplay, first } from 'rxjs/operators';

import {
  responseTimeField,
  showLoadingAfterField,
  showLoadingForAtLeastField,
  loadingStatus,
  showLoading,
  form,
  fetchData,
} from './utilities';

const loading$ = fromEvent(form, 'submit').pipe(
  exhaustMap(() => {
    const data$ = fetchData().pipe(shareReplay(1));
    const showLoading$ = of(true).pipe(
      delay(+showLoadingAfterField.value),
      tap(() => showLoading(true)),
    );

    const timeToHideTheLoading$ = timer(+showLoadingForAtLeastField.value).pipe(
      first(),
      // tap(() => showLoading(false)),
    );

    const shouldShowLoading$ = concat(
      showLoading$,
      timeToHideTheLoading$,
      data$.pipe(tap(() => showLoading(false))),
    );

    return race(data$, shouldShowLoading$);
  }),
);

loading$.subscribe();
