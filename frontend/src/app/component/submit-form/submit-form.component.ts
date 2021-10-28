import { Component, OnInit ,NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
