import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl,FormGroup,FormArray} from '@angular/forms';
import { ProjectService } from '../../service/project/project.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {
  formData = new FormData();
  submit_form = new FormGroup({
    course: new FormControl(''),
    graduation_year: new FormControl(''),
    project_type: new FormControl(''),
    project_nameTH: new FormControl(''),
    project_nameEng: new FormControl(''),
    developNames: new FormArray([
      new FormGroup({
        ID: new FormControl(''),
        firstname: new FormControl(''),
        lastname: new FormControl('')
      })
    ]),
    abstract: new FormControl(''),
    sorec_code: new FormControl(''),
    advisor_name: new FormControl('')
  });
  developNames = this.submit_form.get('developNames') as FormArray;
  fileName = '';

  constructor(private _projectService: ProjectService) { }
  ngOnInit(): void {

    console.log(this.submit_form.value);

  }
  changeCount(number: number) {
    console.log(number);
    if (number === 1) {
      this.developNames.push(new FormGroup({
        ID: new FormControl(''),
        firstname: new FormControl(''),
        lastname: new FormControl('')
      })
      )
    }
    else if (number === -1 && this.developNames.length > 1) {
      this.developNames.removeAt(this.developNames.length - 1)
    }
  }

  submitProject(){
    console.log(this.submit_form.value);
    console.log(this.formData);
    this._projectService.upload(this.formData).subscribe((res) => {
      console.log("upload successfully", res);
    }, (err) => {
      console.log(err.error);
    })

  }

  
  uploadFile(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        console.log(file);
        this.fileName = file.name;
        this.formData.append("file", file);
        this.formData.append("dataProject",JSON.stringify( this.submit_form.value));
    }
  }
}
