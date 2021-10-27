import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../service/login/login.service';


export class Account {
  username!: String;
  _id!: String;
  firstname!: String;
  lastname!: String;
  role!: String;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  content = ""
  dataUser:Account[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private _loginService: LoginService
  ) { }
  

  ngOnInit(): void {
    
    this.dataUser.push(this._loginService.getDataUser()[0])
    console.log(this.dataUser[0]);


    let contentList = ['user-management']
    this.content = String(this.route.snapshot.paramMap.get("id"));

    if (contentList.indexOf(this.content) === -1)
      this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    // if (params.has('id')) {
    //   // this.highlightId = params.get('id');
    // }
    console.log(this.content);
  }
}
