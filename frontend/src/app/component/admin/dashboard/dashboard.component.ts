import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _ProjectService: ProjectService) { }

  dataProject: Array<[]>
  label: Array<string> = []
  countLable = {
    pendding: new Array(),
    accept: new Array()
  }
  sumPendding = 0
  sumAccept = 0
  chartEnable = false
  type = 'bar';
  data = {}
  options = {}

  ngOnInit() {
    this._ProjectService.getProject().subscribe(async (res) => {
      this.dataProject = res
      let tempLabel = new Array()
      let tempPendding = new Array()
      let tempAccept = new Array()

      for (const item of res) {
        let value = item.graduation_year
        if (tempLabel.indexOf(value) === -1) {
          tempLabel.push(value)
          tempAccept.push(0)
          tempPendding.push(0)
        }
        let index = tempLabel.indexOf(value)
        if (item.approve)
          tempAccept[index] += 1
        else
          tempPendding[index] += 1
      }

      // this.sumAccept = this.countLable.accept.reduce((a, b) => a + b, 0)
      // this.sumPendding = this.countLable.pendding.reduce((a, b) => a + b, 0)
      // console.log(this.label, this.countLable);

      //reorder
      // let tempLabel = [...this.label].sort()
      // let tempPendding = Array()
      // let tempAccept = Array()
      this.label = [...tempLabel].sort()
      console.log(this.label, tempLabel);

      for await (const value of this.label) {
        let inx = tempLabel.indexOf(value)
        this.countLable.accept.push(tempAccept[inx])
        this.countLable.pendding.push(tempPendding[inx])
      }
      this.sumAccept = this.countLable.accept.reduce((a, b) => a + b, 0)
      this.sumPendding = this.countLable.pendding.reduce((a, b) => a + b, 0)

      let sumProject = []
      for (let index = 0; index < this.label.length; index++) {
        sumProject.push(this.countLable.accept[index]+this.countLable.pendding[index])
      }

      this.data = {
        labels: this.label,//["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          { 
            label: "Accept",
            data: this.countLable.accept,//[65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(25, 135, 84, 0.6)',
          },
          {
            label: "Pending",
            data: this.countLable.pendding,//[65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 193, 7, 0.6)',
          },
          {
            type:'line',
            label: "Totel",
            data: sumProject,//[65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(0, 0, 0, 0.6)',
          }
        ],
      };
      this.options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        },
        maintainAspectRatio: false
      };
      this.chartEnable = true
    })
  }



  // data = {
  //   labels: this.label,//["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Accept",
  //       data: this.countLable.accept,//[65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: 'rgba(25, 135, 84, 0.6)',
  //     },
  //     {
  //       label: "Pending",
  //       data: this.countLable.pendding,//[65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: 'rgba(255, 193, 7, 0.6)',
  //     }
  //   ],
  // };
  // options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Bar Chart'
  //     }
  //   },
  //   maintainAspectRatio: false
  // };
}
