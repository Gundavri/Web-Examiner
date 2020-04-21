import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrittenExamsComponent } from './written-exams/written-exams.component';
import { Routes, RouterModule } from '@angular/router';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: WrittenExamsComponent }
];

@NgModule({
  declarations: [WrittenExamsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    WrittenExamService
  ]
})
export class WrittenExamsModule { }
