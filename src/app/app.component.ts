import { Component } from '@angular/core';
import { slideInAnimation, slideOutAnimation } from './app-routing.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[slideInAnimation, slideOutAnimation],

})
export class AppComponent {
  title = 'labo4_2do_TP';
}
