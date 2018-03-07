import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  // Define an animation that adjusts the opactiy when a new item is created
  //  in the DOM. We use the 'visible' string as the hard-coded value in the
  //  trigger.
  //
  // When an item is added we wait for 300ms, and then increase the opacity to 1
  //  over a 200ms time interval. When the item is removed we don't delay anything
  //  and use a 200ms interval.
  //
  trigger('visibleTrigger', [
    transition(':enter', [style({ opacity: '0' }), animate('200ms 300ms')]),
  ]);
