import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _loginService: LoginService) { }
  userData = []
  ngOnInit(): void {
    
    // console.log("000", this._loginService.getDataUser())
    console.log(this._loginService.getDataUser())
  }

}


