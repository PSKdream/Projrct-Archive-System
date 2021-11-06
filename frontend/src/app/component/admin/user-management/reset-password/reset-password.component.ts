import { Component, OnInit, EventEmitter , ViewChild, ElementRef,Input,Output } from '@angular/core';
import { LoginService } from '../../../../service/login/login.service';
import {FormControl,FormGroup} from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('closeModel') closeModel: ElementRef;
  @Input() itemData:any;
  @Output() onDone = new EventEmitter<any>();
  textAlert = ""

  formSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private _LoginService: LoginService) {
    this.closeModel = new ElementRef<any>(null)
   }

   ngOnInit(): void {
    // console.log('init reset',this.itemData);
    this.formSection.patchValue({
      username: this.itemData.username,
    })
  }

  updatePassword(){

    if (this.formSection.value.password === '' || this.formSection.value.confirmPassword ==='') {
      this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน"
      return
    }else if (this.formSection.value.password !== this.formSection.value.confirmPassword || this.formSection.value.password.length < 8 ) {
      this.textAlert = "กรุณากำหนดรหัสผ่านใหม่"
      return
    }
    this.textAlert = ""
    let data = {
      _id : this.itemData._id,
      password: this.formSection.value.password,
    }

    this._LoginService.updatePassword(data).subscribe(() => {
      this.closeModel.nativeElement.click();
      // this.onDone.emit("Done")
    }, (error) => {
      this.textAlert = "Error code : "+error.status+" ("+error.statusText+")"
    })
  }
}
