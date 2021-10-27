import { Component, OnInit,NgZone } from '@angular/core';
import { LoginService } from '../../../service/login/login.service';
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  bioSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private _LoginService: LoginService,private _NgZone: NgZone, private _Router: Router) {}

  ngOnInit(): void {}

  submitUser() {
    console.log(this.bioSection.value);
    if (this.bioSection.value.password.length <= 8) {
      console.log('......');
      return
    }
    if (
      this.bioSection.value.username === '' ||
      this.bioSection.value.password === '' ||
      this.bioSection.value.firstname === '' ||
      this.bioSection.value.lastname === '' ||
      this.bioSection.value.role === ''
    ) {
      console.log('Wrong');
      return

    }
    this._LoginService.addUser(this.bioSection.value).subscribe(()=>{
      this._NgZone.run(()=> this._Router.navigateByUrl("/admin/user-management"))
    },(error)=>{
      console.log(error);
    })

  }
}
