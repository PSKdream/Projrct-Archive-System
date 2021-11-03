import { Component, OnInit, NgZone } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { subscribeOn } from 'rxjs/operators';
export class projectAttribute {
  project_nameTH!: String;
  project_nameEng!: String;
  graduation_year!: String;
  sorec_code!: String;
  advisor_name!: String;
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
  data: projectAttribute = {
    project_nameTH: "",
    project_nameEng: "",
    graduation_year: "",
    sorec_code: "",
    advisor_name: "",
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
    this._id = String(this.route.snapshot.paramMap.get("id"));
    this._projectService.getDetail(this._id).subscribe((res) => {
      if (res === null) {
        this.ngZone.run(() => this.router.navigateByUrl('/home'))
      }
      this.data = res
    })
    this._projectService.getUrlFile(this._id).subscribe((res) => {
      // this.urlFile = res[0]
      this.urlFile = this.sanitizer.bypassSecurityTrustResourceUrl(res[0]);
      console.log(this.urlFile);
    })

  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterContentInit() {
    console.log('111', this.data);
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
