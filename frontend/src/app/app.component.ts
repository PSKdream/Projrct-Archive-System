import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isNavView = true;
  constructor(private router: Router) {}
  ngDoCheck(){
    let currentUrl = this.router.url.split('/')[1]
    let withoutUrl = ['login','admin']
    // console.log(withoutUrl.indexOf(currentUrl));

    this.isNavView = (withoutUrl.indexOf(currentUrl)===-1)
  }
}
