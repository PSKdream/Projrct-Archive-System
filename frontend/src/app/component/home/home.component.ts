import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  label = new Array()
  project = new Array()

  constructor(private _ProjectService:ProjectService) { }

  ngOnInit(): void {
    this._ProjectService.getProject().subscribe((res)=>{
      console.log(res);
      let tempLabel = new Array()
      let tempProject = new Array()

      for (const item of res) {
        let value = item.graduation_year
        if (tempLabel.indexOf(value) === -1) {
          tempLabel.push(value)
          tempProject.push([])
        }
        let index = tempLabel.indexOf(value)
        tempProject[index].push(item)
      }

      this.label = [...tempLabel].sort((one, two) => (one > two ? -1 : 1))
      for (const value of this.label) {
        let inx = tempLabel.indexOf(value)
        this.project.push(tempProject[inx])
      }

      console.log(this.label,this.project);

    })

  }

}
