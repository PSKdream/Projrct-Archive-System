import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { subscribeOn } from 'rxjs/operators';
export class projectAttribute {
  project_nameTH!: String;
  project_nameEng!: String;
  graduation_year!: String;
  sorec_code!: String;
  advisor_name!: {
    _id: string,
    firstname: string,
    lastname: string,
  };
  project_type!: String;
  course!: String;
  developNames!: Array<any>;
  abstract!: String;
  approve!: boolean;
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() _idInput: string;
  data: projectAttribute = {
    project_nameTH: "",
    project_nameEng: "",
    graduation_year: "",
    sorec_code: "",
    advisor_name: {
      _id: "",
      firstname: "",
      lastname: "",
    },
    project_type: "",
    course: "",
    developNames: [],
    abstract: "",
    approve: false
  }
  _id: string;
  urlFile: any
  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer,
    private _projectService: ProjectService, private router: Router, private ngZone: NgZone) {
      console.log(this.urlFile);
  }
  ngOnInit(): void {
    if (this._idInput === undefined)
      this._id = String(this.route.snapshot.paramMap.get("id"));
    else
      this._id = this._idInput
    this._projectService.getDetail(this._id).subscribe((res) => {
      this.data = res
    }, (err) => {
      if (this._idInput === undefined)
        this.ngZone.run(() => this.router.navigateByUrl('/home'))
      else
        this.ngZone.run(() => this.router.navigateByUrl('/admin'))
    })
    this._projectService.getUrlFile(this._id).subscribe((res) => {
      // this.urlFile = res[0]
      this.urlFile = this.sanitizer.bypassSecurityTrustResourceUrl(res[0]);
      // console.log(this.urlFile);
    })
  }


  handleClick() {
    this._projectService.approve({ '_id': this._id, 'approve': true }).subscribe((res) => {
      console.log(res);
    })
  }

  onDelete() {
    this._projectService.delete(this._id).subscribe((res) => {
      console.log(res);
      this.ngZone.run(() => this.router.navigateByUrl('/projectlist'))
    })
  }

}
