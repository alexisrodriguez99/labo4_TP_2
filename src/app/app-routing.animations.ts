import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    stagger,
    animateChild,
    keyframes
  } from '@angular/animations';
  export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => *', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', keyframes([
                    style({ transform: 'translateX(100%)', offset: 0 }),
                    style({ transform: 'translateX(0%)', offset: 1 })
                ]))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', keyframes([
                        style({ transform: 'translateX(0%)', offset: 0 }),
                        style({ transform: 'translateX(-100%)', offset: 1 })
                    ]))
                ], { optional: true }),
            ])
        ])
    ]);
  
    export const slideOutAnimation =
    trigger('routeAnimations', [
        transition('* => *', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                  style({ transform: 'translateX(0%)' }),
                  animate('0.5s ease-in-out', keyframes([
                    style({ transform: 'translateX(-100%)', offset: 0 }),
                    style({ transform: 'translateX(0%)', offset: 1 })
                ]))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', keyframes([
                        style({ transform: 'translateX(0%)', offset: 0 }),
                        style({ transform: 'translateX(100%)', offset: 1 })
                    ]))
                ], { optional: true }),
            ])
        ])
    ]);