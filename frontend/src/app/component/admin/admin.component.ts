import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { LoginService } from '../../service/login/login.service';


export class Account {
  username!: String;
  _id!: String;
  firstname!: String;
  lastname!: String;
  role!: String;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  contentList = ['user-management', 'project']
  content: any
  dataUser: any
  @ViewChild('openModel') openModel: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private _loginService: LoginService) {
    this.openModel = new ElementRef<any>(null)
    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.content = this.route.snapshot.paramMap.get("id");
        // if (this.contentList.indexOf(this.content) === -1)
        //   console.log(this.contentList);
        // // this.ngZone.run(() => this.router.navigateByUrl('/admin'))F
      }
    });
  }

  ngOnInit(): void {
    this.dataUser = this._loginService.getDataUser()[0]
    console.log('dddddd', this.dataUser);
  }

  resetPassword() {
    this.openModel.nativeElement.click();
  }
}
