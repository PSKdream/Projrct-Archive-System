import { Component, OnInit, NgZone, ViewChild, ElementRef ,SimpleChanges} from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { LoginService } from '../../service/login/login.service';


export class Account {
  username!: String;
  _id!: String;
  firstname!: String;
  lastname!: String;
  role!: String;
  delete!: boolean;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  contentList = ['user-management', 'project','project-detail']
  content='admin'
  dataUser: Account
  projectDetail = ''
  @ViewChild('openModel') openModel: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private _loginService: LoginService) {
    this.openModel = new ElementRef<any>(null)
    // router.events.subscribe((val) => {
    //   // see also 
    //   if (val instanceof NavigationEnd) {
    //     this.content = this.route.snapshot.url[1].path;
    //     // if (this.contentList.indexOf(this.content) === -1)
    //     //   console.log(this.contentList);
    //     // // this.ngZone.run(() => this.router.navigateByUrl('/admin'))F
    //   }
    // });
  }

  ngOnInit(): void {
    this.dataUser = this._loginService.getDataUser()

    // console.log(this.dataUser);
    if(this.dataUser === undefined){
      this.singOut()
    }
    // this.content = this.route.snapshot.url[1].path;
    if(this.route.snapshot.url.length >= 2){
      this.content = this.route.snapshot.url[1].path
    }
    if(this.route.snapshot.url.length == 3){
      this.projectDetail = this.route.snapshot.url[2].path
    }
    // console.log(this.route.snapshot.url);
    // console.log('dddddd', this.dataUser);
    
  }

  resetPassword() {
    this.openModel.nativeElement.click();
  }
  singOut(){
    this._loginService.deleteDataUser()
    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

}
