import {
  Component, OnInit, EventEmitter, ViewChild,
  ElementRef, Input, Output
} from '@angular/core';
import { LoginService } from '../../../../service/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';
import {FormControl,FormGroup} from '@angular/forms';

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
    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    role: new FormControl(''),
  });


  constructor(private _LoginService: LoginService) {
    this.closeModel = new ElementRef<any>(null)
  }

  ngOnInit(): void {
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
      this.bioSection.setValue({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        role: '',
      })
      this.onDone.emit("Done")
    }, (error) => {
      this.textAlert = "Error code : "+error.status+" ("+error.statusText+")"
      console.log(error);
    })

  }

}
