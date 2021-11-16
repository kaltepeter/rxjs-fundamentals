import { fromEvent, interval } from 'rxjs';
import {
  throttleTime,
  debounceTime,
  delay,
  debounce,
  throttle,
  scan,
  map,
  tap,
} from 'rxjs/operators';

import {
  button,
  panicButton,
  addMessageToDOM,
  deepThoughtInput,
  setTextArea,
  setStatus,
} from './utilities';

const panicButtonClicked$ = fromEvent(panicButton, 'click');

const buttonClicks$ = fromEvent(button, 'click').pipe(
  // debounceTime(1000),
  // throttleTime(2000),
  // delay(2000),
  // debounce(() => panicButtonClicked$),
  throttle(() => panicButtonClicked$),
);

buttonClicks$.subscribe(addMessageToDOM);
