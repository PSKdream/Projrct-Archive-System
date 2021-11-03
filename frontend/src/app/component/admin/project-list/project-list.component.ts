import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  dataProjectList:any;

  constructor( private _ProjectService: ProjectService) {}

  ngOnInit(): void {
    this._ProjectService.getProject().subscribe((res) =>{
      this.dataProjectList = res
      console.log("project",this.dataProjectList);
    })
    // console.log("project",this.dataProjectList);
  }


}
