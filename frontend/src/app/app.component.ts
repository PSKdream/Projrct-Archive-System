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
    this.isNavView = !(this.router.url=="/login" || this.router.url=="/admin")
  }
}
