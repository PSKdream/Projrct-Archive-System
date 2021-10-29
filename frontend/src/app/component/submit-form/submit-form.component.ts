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
  constructor() { }
  ngOnInit(): void { 
  }
  changeCount(number:number){
    console.log(number);
    if(number === 1){
      this.arr.push(this.arr[this.arr.length-1]+1)
    }
    else if(number === -1 && this.arr.length>1){
      this.arr.pop()
    }
  }
}
