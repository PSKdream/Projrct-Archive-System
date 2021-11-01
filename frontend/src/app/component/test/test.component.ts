import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from '../../service/project/project.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  exam : FormGroup;

  formData = new FormData();
  arr = [1] 
  formSection = new FormGroup({
    text: new FormControl(''),
  });
  constructor(private _projectService: ProjectService,
     private router: Router,
    private ngZone: NgZone,
    private formbuilder:FormBuilder) { 
      this.exam = this.formbuilder.group({
        name:[null,Validators.required],
        mail:[null,Validators.required,Validators.email],
        phone:[null,Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')],
        message : new FormControl(null, [Validators.required, Validators.minLength(10)])
      })
    }

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

  changeCount(number:number){
    console.log(number);
    if(number === 1){
      this.arr.push(this.arr[this.arr.length-1]+1)
    }
    else if(number === -1 && this.arr.length>1){
      this.arr.pop()
    }
  }
  // onSubmit():any{
  //   if(window.confirm("Are you sure")){
      
  //   }
  // }
}
