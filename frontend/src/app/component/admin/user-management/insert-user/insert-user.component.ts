import {
  Component, OnInit, EventEmitter, ViewChild,
  ElementRef, Input, Output
} from '@angular/core';
import { LoginService } from '../../../../service/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';
import {FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.scss']
})
export class InsertUserComponent implements OnInit {
  @ViewChild('closeModel') closeModel: ElementRef;
  @Output() onDone = new EventEmitter<any>();

  md5 = new Md5();
  textAlert = ""

  bioSection = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required),
  });


  constructor(private _LoginService: LoginService) {
    this.closeModel = new ElementRef<any>(null)
  }

  ngOnInit(): void {
  }

  setVariableDefault(){
    this.bioSection.reset(this.bioSection.value)
    this.bioSection.reset(this.bioSection.touched)
  }

  submitUser() {
    // console.log(this.bioSection.value);
    if (this.bioSection.value.password.length < 8) {
      this.textAlert = "กรุณากำหนดรหัสผ่านใหม่"
      return
    }
    if (
      this.bioSection.value.username === '' ||
      this.bioSection.value.password === '' ||
      this.bioSection.value.firstname === '' ||
      this.bioSection.value.lastname === '' ||
      this.bioSection.value.role === ''
    ) {
      this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน"
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
      this.setVariableDefault()
      this.onDone.emit("Done")
    }, (error) => {
      this.textAlert = "Error code : "+error.status+" ("+error.statusText+")"
      console.log(error);
    })

  }

}
