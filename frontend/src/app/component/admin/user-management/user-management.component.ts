import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../../service/login/login.service';
import { Router } from "@angular/router";
import { Md5 } from 'ts-md5/dist/md5';
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
  itemToChild = [];

  @ViewChild('closeModel') closeModel: ElementRef;
  md5 = new Md5();
  userAccountList:any

  bioSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private _LoginService: LoginService,
    private _NgZone: NgZone,
    private _Router: Router) {
    this.closeModel = new ElementRef<any>(null)
  }

   ngOnInit(): void { 
    this.getUserList()
  }

  onEdit(item:[]){
    console.log(item);
    this.itemToChild = item
  }

  getUserList(){
    this._LoginService.getUserList().subscribe((res)=>{
      // console.log(res)
      this.userAccountList =  res
    })
  }

  onDelete(_id:String){
    if(confirm("You are delete user.") === false)
      return
    this._LoginService.deleteUser(_id).subscribe(()=>{
      this.getUserList()
    }, (error) => {
      console.log(error);
    })
  }

  submitUser() {
    // console.log(this.bioSection.value);
    if (this.bioSection.value.password.length < 8) {
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

    let data = {
      username: this.bioSection.value.username,
      password: String(this.md5.appendStr(this.bioSection.value.password).end()),
      firstname: this.bioSection.value.firstname,
      lastname: this.bioSection.value.lastname,
      role: this.bioSection.value.role
    }


    this._LoginService.addUser(data).subscribe(() => {
      this.closeModel.nativeElement.click();
      this.getUserList()
    }, (error) => {
      console.log(error);
    })

  }
}
