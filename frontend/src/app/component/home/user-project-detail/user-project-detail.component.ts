import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-user-project-detail',
  templateUrl: './user-project-detail.component.html',
  styleUrls: ['./user-project-detail.component.scss']
})
export class UserProjectDetailComponent implements OnInit {
  _id = ""
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._id = String(this.route.snapshot.paramMap.get("id"));
  }

}
