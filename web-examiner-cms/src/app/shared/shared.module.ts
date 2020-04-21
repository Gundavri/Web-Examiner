import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateExamComponent } from './dialogs/create-exam/create-exam.component';
import { CreateUpdateQuestionComponent } from './dialogs/create-update-question/create-update-question.component';
import { AnswersDialogComponent } from './dialogs/answers-dialog/answers-dialog.component';
import { AnswerService } from '../core/services/answer.service';
import { ViewImageComponent } from './dialogs/view-image/view-image.component';
import { ExamActivateDialogComponent } from './dialogs/exam-activate-dialog/exam-activate-dialog.component';

var dialogList = [
  ConfirmDialogComponent,
  CreateExamComponent,
  CreateUpdateQuestionComponent,
  AnswersDialogComponent,
  ViewImageComponent,
  ExamActivateDialogComponent
];

var componentsList = [
  dialogList
];

@NgModule({
  declarations: [
    componentsList
  ],
  exports: [
    componentsList
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: [
    dialogList
  ],
  providers: [
    AnswerService
  ]
})
export class SharedModule { }
