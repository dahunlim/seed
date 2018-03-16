import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        // console.log("event started")
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
        // console.log("event end")
      }
    });
  }

  ngOnInit(): void {}
}
