import { Component, OnInit ,NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {
  arr = [0] 
  submit_form = new FormGroup({
    course: new FormControl(''),
    graduation_year : new FormControl(''),
    project_type : new FormControl(''),
    nameTH : new FormControl(''),
    nameEng : new FormControl(''),
    developID : new FormControl(''),
    developName : new FormControl(['']),
    abstract : new FormControl(''),
    sorec_code : new FormControl(''),
    advisor_name: new FormControl([''])
  });
  constructor() { }
  ngOnInit(): void { 
  }
  changeCount(number:number){
    console.log(number);
    if(number === 1){
      this.arr.push(this.arr[this.arr.length-1]+1)
      this.submit_form.value.developName.push('');
      console.log(this.submit_form.value.developName);
      // this.submit_form.patchValue({
      //   developName: this.submit_form.developNa
      // })
    }
    else if(number === -1 && this.arr.length>1){
      this.arr.pop()
    }
  }
}
