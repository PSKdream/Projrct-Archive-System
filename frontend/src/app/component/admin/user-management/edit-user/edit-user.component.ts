import { Component, OnInit, NgZone, ViewChild, ElementRef,Input } from '@angular/core';
import { LoginService } from '../../../../service/login/login.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ReactiveFormsModule,

} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild('openModel') openModel: ElementRef;
  @ViewChild('closeModel') closeModel: ElementRef;
  @Input() item:any;
  


  formSection = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private _LoginService: LoginService) {
    this.openModel = new ElementRef<any>(null)
    this.closeModel = new ElementRef<any>(null)
   }

  ngOnInit(): void {
    this.openModel.nativeElement.click();
    console.log("object");
  }
  ngOnChanges() {
    console.log(`ngOnChanges - counter is ${this.item}`);
    console.log(this.item);
    this.formSection.setValue({
      username: this.item.username,
      firstname: this.item.firstname,
      lastname: this.item.lastname,
      role: this.item.role,
    })
    this.openModel.nativeElement.click();
  }
  submitData(){
    if (
      this.formSection.value.username === '' ||
      this.formSection.value.firstname === '' ||
      this.formSection.value.lastname === '' ||
      this.formSection.value.role === ''
    ) {
      console.log('Wrong');
      return
    }

    let data = {
      _id : this.item._id,
      username: this.formSection.value.username,
      firstname: this.formSection.value.firstname,
      lastname: this.formSection.value.lastname,
      role: this.formSection.value.role
    }

    this._LoginService.updateUser(data).subscribe(() => {
      this.closeModel.nativeElement.click();
    }, (error) => {
      console.log(error);
    })
  }

}
