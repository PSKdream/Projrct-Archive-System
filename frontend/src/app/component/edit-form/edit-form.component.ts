import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project/project.service';
import { LoginService } from '../..//service/login/login.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

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
  _id:string
  data: any
  approve:boolean
  teacherList = Array()
  paddingServer = false

  constructor(private _projectService: ProjectService,
    private route: ActivatedRoute,private _loginService :LoginService, private router: Router, private ngZone: NgZone) {
      
  }

  ngOnInit(): void {
    this._id = String(this.route.snapshot.paramMap.get("id"));
    this._projectService.getDetail(this._id).subscribe((res) => {
      console.log(res);
      if (res === null) {
        this.ngZone.run(() => this.router.navigateByUrl('/home'))
      }
      let temp = res
      temp.advisor_name = temp.advisor_name._id
      this.submit_form.patchValue(temp)
      this.approve = temp.approve
    }, (err) => {
      this.ngZone.run(() => this.router.navigateByUrl('/home'))
    })
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
    if (this.submit_form.status === 'INVALID') {
      alert('Please check input')
      return
    }
    if (this.fileUpload === false) {
      alert('Please check file type')
      return
    }
    this.paddingServer = true
    this._projectService.update(this.formData,this._id).subscribe((res) => {
      console.log("upload successfully", res);
      alert('Submit successfully')
      this.paddingServer = false
    }, (err) => {
      console.log(err.error);
      this.paddingServer = false
    })

  }


  uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type != 'application/pdf') {
        this.fileAlert = 'File type invalid'
        return
      }
      this.fileAlert = ''
      this.fileUpload = true;
      this.formData.append("file", file);
      this.formData.append("dataProject", JSON.stringify(this.submit_form.value));
    } else {
      this.fileAlert = 'File is required'
    }
  }

}
