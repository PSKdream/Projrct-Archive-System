import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
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
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  data:projectAttribute = {
    project_nameTH: "",
    project_nameEng: "",
    graduation_year: "",
    sorec_code: "",
    advisor_name: "",
    project_type: "",
    course: "",
    developNames: [],
    abstract: ""
  }
  urlFile:any
  constructor(private route: ActivatedRoute,public sanitizer: DomSanitizer, private _projectService: ProjectService) {
    let _id = String(this.route.snapshot.paramMap.get("id"));
    this._projectService.getDetail(_id).subscribe((res) => {
      this.data = res
    })
    this._projectService.getUrlFile(_id).subscribe((res)=>{
      // this.urlFile = res[0]
      this.urlFile= this.sanitizer.bypassSecurityTrustResourceUrl(res[0]);
      console.log(this.urlFile);
    })
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterContentInit() {
    console.log('111', this.data);
  }

}
