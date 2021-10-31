import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { TestComponent } from './component/test/test.component';
import { ProjectListComponent } from './component/admin/project-list/project-list.component';
import { SubmitFormComponent } from './component/submit-form/submit-form.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'submit', component: SubmitFormComponent },
  { path: 'projectlist', component: ProjectListComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
