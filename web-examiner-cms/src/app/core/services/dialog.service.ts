import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CreateExamComponent } from 'src/app/shared/dialogs/create-exam/create-exam.component';
import { CreateUpdateQuestionComponent } from 'src/app/shared/dialogs/create-update-question/create-update-question.component';
import { QuestionPostPutReq, QuestionGetRes } from 'src/app/shared/models/question';
import { AnswersDialogComponent } from 'src/app/shared/dialogs/answers-dialog/answers-dialog.component';
import { ViewImageComponent } from 'src/app/shared/dialogs/view-image/view-image.component';
import { ExamActivateDialogComponent } from 'src/app/shared/dialogs/exam-activate-dialog/exam-activate-dialog.component';
import { ExamGetRes, ExamPutReq } from 'src/app/shared/models/exam';
@Injectable()
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  openConfirmDialog(): Observable<boolean> {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px'
    });
    return confirmDialogRef.afterClosed();
  }

  openCreateExamDialog(): Observable<number> {
    const createExamDialogRef = this.dialog.open(CreateExamComponent, {
      width: '300px'
    });
    return createExamDialogRef.afterClosed();
  }

  openCreateUpdateQuestionDialog(data: QuestionPostPutReq | null): Observable<QuestionPostPutReq> {
    const createUpdateQuestionDialogRef = this.dialog.open(CreateUpdateQuestionComponent, {
      width: '500px',
      height: '580px',
      data: data
    });
    return createUpdateQuestionDialogRef.afterClosed();
  }

  openAnswersDialog(data: QuestionGetRes): Observable<any> {
    const answerDialogRef = this.dialog.open(AnswersDialogComponent, {
      width: '500px',
      height: '600px',
      data: data
    });
    return answerDialogRef.afterClosed();
  }

  openViewImage(data: string): Observable<any> {
    const viewImageDialogRef = this.dialog.open(ViewImageComponent, {
      width: '640px',
      height: '450px',
      data: data
    });
    return viewImageDialogRef.afterClosed();
  }

  openExamActivateDialog(data: ExamGetRes): Observable<ExamPutReq> {
    const examActivateDialogRef = this.dialog.open(ExamActivateDialogComponent, {
      width: '240px',
      height: '200px',
      data: data
    });
    return examActivateDialogRef.afterClosed();
  }

}
