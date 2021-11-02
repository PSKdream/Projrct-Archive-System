import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private _projectService: ProjectService) {
    let _id = String(this.route.snapshot.paramMap.get("id"));
    this._projectService.getDetail(_id).subscribe((res) => {
      this.data = res
    })
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterContentInit() {
    console.log('111', this.data);
  }

}
