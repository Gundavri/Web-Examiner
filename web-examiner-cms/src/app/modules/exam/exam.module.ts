import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExamsComponent } from './exams/exams.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ExamService } from 'src/app/core/services/exam.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: '', component: ExamsComponent }
];

@NgModule({
  declarations: [ExamsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule
  ],
  providers: [
    DialogService
  ]
})
export class ExamModule { }
