import { Component, OnInit } from '@angular/core';  
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router  
  ) {}

  ngOnInit(): void {
    let params = this.route.snapshot.paramMap;
    // if (params.has('id')) {
    //   // this.highlightId = params.get('id');
    // }
    console.log(params);
  }
}
