import { Component, OnInit,Input } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() userData:any;
  dataProjectList:any;

  constructor( private _ProjectService: ProjectService) {}

  ngOnInit(): void {
    this._ProjectService.getProject().subscribe((res) =>{
      this.dataProjectList = res
      console.log("project");
      console.log(this.userData);
      console.log(res);
    })
    // console.log("project",this.dataProjectList);
  }


}
