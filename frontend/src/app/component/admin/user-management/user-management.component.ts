import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login/login.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

  userAccountList: any

  constructor(private _LoginService: LoginService) {  }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    this._LoginService.getUserList().subscribe((res) => {
      this.userAccountList = res
    })
  }

  onDelete(_id: String) {
    if (confirm("You are delete user.") === false)
      return
    this._LoginService.deleteUser(_id).subscribe(() => {
      this.getUserList()
    }, (error) => {
      console.log(error);
    })
  }

  //#region chlid Component
  onDone(event:any) {
    this.getUserList()
  }
  //#endregion

}
