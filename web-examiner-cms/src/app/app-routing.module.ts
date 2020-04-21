import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainGuard } from './core/guards/main.guard';


const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule), canActivate: [MainGuard] },
  { path: '**', redirectTo: 'admin/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
