import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'exams', loadChildren: () => import('../exam/exam.module').then(m => m.ExamModule) },
      { path: 'questions', loadChildren: () => import('../question/question.module').then(m => m.QuestionModule) },
      { path: 'written-exams', loadChildren: () => import('../written-exams/written-exams.module').then(m => m.WrittenExamsModule) },
      { path: '**', redirectTo: 'users', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
