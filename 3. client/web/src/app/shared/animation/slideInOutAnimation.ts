import {animate, state, style, transition, trigger} from "@angular/animations";

export const slideInOutAnimation = trigger('slideInOutAnimation', [
  // end state styles for route container (host)
  state('*', style({})),
  // route 'enter' transition
  transition(':enter', [

    // styles at start of transition
    style({
      // start with the content positioned off the right of the screen,
      // -400% is required instead of -100% because the negative position adds to the width of the element
      top: '-400%',
    }),

    // animation and styles at end of transition
    animate('.5s ease-in-out', style({
      // transition the right position to 0 which slides the content into view
      top: 0,
    }))
  ]),

  // route 'leave' transition
  transition(':leave', [
    // animation and styles at end of transition
    animate('.5s ease-in-out', style({
      // transition the right position to -400% which slides the content out of view
      right: '-400%',

      // transition the background opacity to 0 to fade it out
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }))
  ])
])
