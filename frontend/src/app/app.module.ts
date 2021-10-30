import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { UserManagementComponent } from './component/admin/user-management/user-management.component';
import { TestComponent } from './component/test/test.component';
import { SubmitFormComponent } from './component/submit-form/submit-form.component';
import { EditUserComponent } from './component/admin/user-management/edit-user/edit-user.component';
import { InsertUserComponent } from './component/admin/user-management/insert-user/insert-user.component';
import { ResetPasswordComponent } from './component/admin/user-management/reset-password/reset-password.component';
import { ProjectListComponent } from './component/admin/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    UserManagementComponent,
    TestComponent,
    SubmitFormComponent,
    EditUserComponent,
    InsertUserComponent,
    ResetPasswordComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
