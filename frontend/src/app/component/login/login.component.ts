import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bioSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor() { }
  ngOnInit() {
  }
  callingFunction() {
    console.log(111,this.bioSection.value);
   }
}
