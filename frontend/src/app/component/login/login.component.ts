import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFail = ""

  bioSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private _loginService: LoginService, private router: Router,
    private ngZone: NgZone) { }
  ngOnInit() {
    console.log(this._loginService.getDataUser().length);
    if(this._loginService.getDataUser().length === 1)
      this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    // console.log(this.LoginService.getDataUser())
  }
  callingFunction() {
    this._loginService.login(this.bioSection.value).subscribe((res) => {
      console.log("Login successfully",res);
      this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    }, (err) => {
      this.loginFail = err.error
      console.log(err.error);
    })
    // console.log("111", this._loginService.getDataUser())
  }
}
