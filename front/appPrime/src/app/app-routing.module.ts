import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { LayoutComponent } from './componentes/layout/layout.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : "", component : LayoutComponent, children: [
      { path : "", redirectTo: "/home", pathMatch: "full" },
      { path : "home", component: HomeComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
