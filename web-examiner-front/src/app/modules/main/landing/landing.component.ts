import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExamRes } from 'src/app/shared/models/exam.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExamService } from 'src/app/core/services/exam.service';
import { Router } from '@angular/router';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam.model';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  // Subscriptions
  tokenValidSub: Subscription;
  getExamsSub: Subscription;
  getWrittenExamsSub: Subscription;
  confirmDialogSub: Subscription;

  constructor(
    private authService: AuthService,
    public examService: ExamService,
    private writtenExamService: WrittenExamService,
    private dialogService: DialogService,
    private errorHandler: ErrorHandler,
    private router: Router
  ) { }

  ngOnInit() {
    this.tokenValidSub = this.authService.tokenIsValid$().subscribe(res => {
      this.getExams();
      this.getWrittenExams();
    }, err => {
      this.router.navigate(['/login']);
    });
  }

  getExams() {
    this.getExamsSub = this.examService.getExams$().subscribe((exams: ExamRes[]) => {
      this.examService.setExams([...exams]);
    }, this.errorHandler.handleError);
  }

  getWrittenExams() {
    this.getWrittenExamsSub = this.writtenExamService.getWrittenExams$().subscribe((writtenExams: WrittenExamGetRes[]) => {
      this.writtenExamService.setWrittenExams(writtenExams);
    }, this.errorHandler.handleError);
  }

  examClicked(index: number) {
    const writtenExam: WrittenExamGetRes = this.writtenExamService.getWrittenExams.find((wx: WrittenExamGetRes) => {
      return wx.exam_num === this.examService.getExams[index].exam_num;
    });
    if(writtenExam) {
      this.router.navigate([`/written-exam/${writtenExam.exam_num}`]);
    } else {
      if(!this.examService.getExams[index].is_active) return;
      this.confirmDialogSub = this.dialogService.openConfirmDialog(this.examService.getExams[index].exam_num).subscribe((res: boolean) => {
        if(res) {
          this.router.navigate([`/exam/${this.examService.getExams[index].exam_num}`]);
        }
      });
    }
  }


  ngOnDestroy() {
    if(this.tokenValidSub) this.tokenValidSub.unsubscribe();
    if(this.getExamsSub) this.getExamsSub.unsubscribe();
    if(this.getWrittenExamsSub) this.getWrittenExamsSub.unsubscribe();
  }

}
