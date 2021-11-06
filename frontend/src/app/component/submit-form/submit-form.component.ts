import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project/project.service';
import { LoginService } from '../..//service/login/login.service';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;
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
  paddingServer = false

  constructor(private _projectService: ProjectService,
    private _loginService: LoginService,) {
    this.inputFile = new ElementRef<any>(null)
  }

  ngOnInit(): void {
    // console.log(this.submit_form.value);
    this._loginService.getTeacherList().subscribe((res) => {
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
    if (this.submit_form.status === 'INVALID') {
      alert('Please check input')
      return
    }
    if (this.fileUpload === false) {
      alert('Please check file type')
      return
    }
    this.paddingServer = true
    this._projectService.upload(this.formData).subscribe((res) => {
      alert('Submit successfully')
      this.submit_form.reset()
      this.formData = new FormData();
      this.fileUpload = false;
      this.inputFile.nativeElement.value = ""
      this.paddingServer = false
    }, (err) => {
      console.log(err.error);
      this.paddingServer = false
    })
  }


  uploadFile(event: any) {
    const file: File = event.target.files[0];
    let data = this.submit_form.value
    data.graduation_year = String(data.graduation_year)
    if (file) {
      if (file.type != 'application/pdf') {
        this.fileAlert = 'File type invalid'
        return
      }
      this.fileAlert = ''
      this.fileUpload = true;
      this.formData.append("file", file);

      this.formData.append("dataProject", JSON.stringify(data));
    } else {
      this.fileAlert = 'File is required'
    }
  }
}
