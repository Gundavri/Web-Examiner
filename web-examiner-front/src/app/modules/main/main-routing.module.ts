import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExamComponent } from './exam/exam.component';
import { LandingComponent } from './landing/landing.component';
import { ExamGuard } from 'src/app/core/guards/exam.guard';
import { WrittenExamComponent } from './written-exam/written-exam.component';
import { WrittenExamGuard } from 'src/app/core/guards/written-exam.guard';


const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LandingComponent },
      { path: 'exam/:id', component: ExamComponent,  canActivate: [ExamGuard]},
      { path: 'written-exam/:id', component: WrittenExamComponent,  canActivate: [WrittenExamGuard]},
      { path: '**', redirectTo: 'landing', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
