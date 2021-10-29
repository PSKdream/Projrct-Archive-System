import { Component, OnInit, EventEmitter , ViewChild, ElementRef,Input,Output } from '@angular/core';
import { LoginService } from '../../../../service/login/login.service';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
 
  @ViewChild('closeModel') closeModel: ElementRef;
  @Input() itemData:any;
  @Output() onDone = new EventEmitter<any>();
  
  textAlert = ""

  formSection = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private _LoginService: LoginService) {
    this.closeModel = new ElementRef<any>(null)
   }

  ngOnInit(): void {
    console.log('init',this.itemData);
    this.formSection.setValue({
      username: this.itemData.username,
      firstname: this.itemData.firstname,
      lastname: this.itemData.lastname,
      role: this.itemData.role,
    })
  }
  // ngOnChanges() {
  //   // console.log(`ngOnChanges - counter is ${this.item}`);
  //   console.log(this.itemData);
    
  // }
  submitData(){
    if (
      this.formSection.value.username === '' ||
      this.formSection.value.firstname === '' ||
      this.formSection.value.lastname === '' ||
      this.formSection.value.role === ''
    ) {
      this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน"
      return
    }

    let data = {
      _id : this.itemData._id,
      username: this.formSection.value.username,
      firstname: this.formSection.value.firstname,
      lastname: this.formSection.value.lastname,
      role: this.formSection.value.role
    }

    this._LoginService.updateUser(data).subscribe(() => {
      this.closeModel.nativeElement.click();
      this.onDone.emit("Done")
    }, (error) => {
      this.textAlert = "Error code : "+error.status+" ("+error.statusText+")"
    })
  }

}
