import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project/project.service';
import { LoginService } from '../..//service/login/login.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {

  formData = new FormData();
  submit_form = new FormGroup({
    course: new FormControl('', Validators.required),
    graduation_year: new FormControl('', Validators.required),
    project_type: new FormControl('', Validators.required),
    project_nameTH: new FormControl('', Validators.required),
    project_nameEng: new FormControl('', Validators.required),
    developNames: new FormArray([
      new FormGroup({
        ID: new FormControl('', Validators.required),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required)
      })
    ]),
    abstract: new FormControl('', Validators.required),
    sorec_code: new FormControl('', Validators.required),
    advisor_name: new FormControl('', Validators.required)
  });
  developNames = this.submit_form.get('developNames') as FormArray;
  fileUpload = false;
  fileAlert = '';
  teacherList = Array()

  constructor(private _projectService: ProjectService,private _loginService :LoginService) {
  }

  ngOnInit(): void {
    // console.log(this.submit_form.value);
    this._loginService.getTeacherList().subscribe((res)=>{
      this.teacherList = res
    })
  }
  changeCount(number: number) {
    // console.log(number);
    if (number === 1) {
      this.developNames.push(new FormGroup({
        ID: new FormControl('', Validators.required),
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required)
      })
      )
    }
    else if (number === -1 && this.developNames.length > 1) {
      this.developNames.removeAt(this.developNames.length - 1)
    }
  }

  submitProject() {
    console.log(this.submit_form.status);
    if (this.submit_form.status === 'INVALID' || this.fileUpload === false) {
      alert('Please check input')
      return
    }
    this._projectService.upload(this.formData).subscribe((res) => {
      console.log("upload successfully", res);
      alert('OK')
    }, (err) => {
      console.log(err.error);
    })

  }


  uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type != 'application/pdf') {
        this.fileAlert = 'file type invalid'
        return
      }
      this.fileAlert = ''
      this.fileUpload = true;
      this.formData.append("file", file);
      this.formData.append("dataProject", JSON.stringify(this.submit_form.value));
    } else {
      this.fileAlert = 'file is required'
    }
  }
}
