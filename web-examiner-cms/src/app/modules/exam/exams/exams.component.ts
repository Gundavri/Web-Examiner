import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam.service';
import { Subscription } from 'rxjs';
import { ExamGetRes, ExamDeleteRes, ExamPutRes, ExamPutReq } from 'src/app/shared/models/exam';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit, OnDestroy {

  // Subscriptions
  getExamsSub: Subscription;
  deleteExamSub: Subscription;
  createExamSub: Subscription;
  updateExamsub: Subscription;
  confirmDialogSub: Subscription;
  createExamDialogSub: Subscription;

  constructor(
    public examService: ExamService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.getExamsSub = this.examService.examsGet$().subscribe((res: ExamGetRes[]) => {
      this.examService.exams = res;
    }, this.snackbarService.displayError)
  }

  onDelete(index: number) {
    const id = this.examService.exams[index]._id;
    this.confirmDialogSub = this.dialogService.openConfirmDialog().subscribe((res: boolean) => {
      if (res) {
        this.deleteExamSub = this.examService.examDelete$(id).subscribe((res: ExamDeleteRes) => {
          this.examService.exams = this.examService.exams.filter((exam: ExamGetRes) => {
            return exam._id !== id;
          });
        }, this.snackbarService.displayError);
      }
    });
  }

  onUpdate(index: number) {
    const id = this.examService.exams[index]._id;
    if(this.examService.exams[index].is_active){
      this.confirmDialogSub = this.dialogService.openConfirmDialog().subscribe((res: boolean) => {
        if (res) {
          this.updateExamsub = this.examService.examPut$(id, {is_active: false}).subscribe((res: ExamPutRes) => {
            this.examService.exams[index].is_active = false;
          }, this.snackbarService.displayError);
        }
      });
    } else {
      this.confirmDialogSub = this.dialogService.openExamActivateDialog(this.examService.exams[index]).subscribe((res1: ExamPutReq) => {
        if(res1) {
          res1.is_active = true;
          this.updateExamsub = this.examService.examPut$(id, res1).subscribe((res2: ExamPutRes) => {
            this.examService.exams[index].is_active = true;
            this.examService.exams[index].exam_time = res1.exam_time;
            this.examService.exams[index].questions_amount = res1.questions_amount;
          }, this.snackbarService.displayError);
        }
      });
    }
  }

  onAdd() {
    this.createExamDialogSub = this.dialogService.openCreateExamDialog().subscribe((res: number) => {
      this.createExamSub = this.examService.examPost$({exam_num: res}).subscribe((exam: ExamGetRes) => {
        this.examService.exams.push(exam);
      }, this.snackbarService.displayError);
    });
  } 

  onQuestions(index: number) {
    this.router.navigate(['/admin/questions/' + this.examService.exams[index].exam_num]);
  }

  ngOnDestroy() {
    if(this.getExamsSub) this.getExamsSub.unsubscribe();
    if(this.confirmDialogSub) this.confirmDialogSub.unsubscribe();
    if(this.createExamDialogSub) this.createExamDialogSub.unsubscribe();
    if(this.deleteExamSub) this.deleteExamSub.unsubscribe();
    if(this.createExamSub) this.createExamSub.unsubscribe();
    if(this.updateExamsub) this.updateExamsub.unsubscribe();
  }
}
