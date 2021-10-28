import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from '../../service/project/project.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  formData = new FormData();

  formSection = new FormGroup({
    text: new FormControl(''),
  });
  constructor(private _projectService: ProjectService, private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
  }
  callingFunction() {
    console.log(this.formData);
    this._projectService.upload(this.formData).subscribe((res) => {
      console.log("Login successfully", res);
      // this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    }, (err) => {
      console.log(err.error);
    })
    // // console.log("111", this._loginService.getDataUser())
  }
  fileName = '';
  uploadFile(event:any) {
    const file:File = event.target.files[0];

    if (file) {
        console.log(event.target.files);
        this.fileName = file.name;
        this.formData.append("file", file);
        console.log(this.formData)
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
    }
  }
}
