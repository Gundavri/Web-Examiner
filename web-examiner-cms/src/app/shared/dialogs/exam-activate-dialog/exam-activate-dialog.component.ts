import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamGetRes } from '../../models/exam';

@Component({
  selector: 'app-exam-activate-dialog',
  templateUrl: './exam-activate-dialog.component.html',
  styleUrls: ['./exam-activate-dialog.component.scss']
})
export class ExamActivateDialogComponent implements OnInit {

  examTime: number;
  questionsAmount: number;

  constructor(
    public dialogRef: MatDialogRef<ExamActivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExamGetRes) { }

  ngOnInit() {
    this.examTime = this.data.exam_time;
    this.questionsAmount = this.data.questions_amount;
  }

  onClick(submitted: boolean) {
    if(submitted === false) this.dialogRef.close(null);
    if(this.examTime > 0 && this.questionsAmount > 0) {
      this.dialogRef.close({
        exam_time: this.examTime,
        questions_amount: this.questionsAmount
      });
    }
  }

}
