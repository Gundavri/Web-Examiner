import { Component, OnInit, Inject, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionGetRes } from '../../models/question';
import { AnswerGetRes, AnswerDeleteRes, AnswerPutRes } from '../../models/answer';
import { Subscription } from 'rxjs';
import { AnswerService } from 'src/app/core/services/answer.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-answers-dialog',
  templateUrl: './answers-dialog.component.html',
  styleUrls: ['./answers-dialog.component.scss']
})
export class AnswersDialogComponent implements OnInit, OnDestroy {

  answers: AnswerGetRes[] = [];
  addClicked: boolean = false;
  imgSrc: any;
  image: File;

  // Subscriptions Arr
  subscriptionsArr: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AnswersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionGetRes,
    private answerService: AnswerService,
    private snackbarService: SnackbarService
  ) { }

  @HostListener('window:paste', ['$event.clipboardData.files'])
  handleImgPaste(files: []) {
    if(files.length > 0){
      this.onChange(files);
    }
  }

  ngOnInit() {
    this.getAnswers();
  }

  getAnswers() {
    this.subscriptionsArr.push(
      this.answerService.answersGet$(this.data._id).subscribe((answers: AnswerGetRes[]) => {
        this.answers = answers;
      }, this.snackbarService.displayError)
    );
  }

  onNew(answer: string, point: string) {
    this.subscriptionsArr.push(
      this.answerService.answerPost$({
        answer: answer,
        point: Number(point),
        parent_question: this.data._id,
        answer_img: this.image
      }).subscribe((res: AnswerGetRes) => {
        res.answer_img = environment.IMAGE_BASE_URL + res.answer_img;
        this.answers.push(res);
        this.addClicked = false;
        this.imgSrc = '';
        this.image = null;
      }, this.snackbarService.displayError)
    );
  }

  onClear() {
    this.addClicked = false;
    this.imgSrc = '';
    this.image = null;
  }

  onUpdate(index: number, answer: string, point: string) {
    this.subscriptionsArr.push(
      this.answerService.answerPut$(this.answers[index]._id, {
        answer: answer,
        point: Number(point)
      }).subscribe((res: AnswerPutRes) => {
        this.answers[index].answer = answer;
        this.answers[index].point = Number(point);
      }, this.snackbarService.displayError)
    );
  }

  onDelete(index: number) {
    this.subscriptionsArr.push(
      this.answerService.answerDelete$(this.answers[index]._id).subscribe((res: AnswerDeleteRes) => {
        this.answers.splice(index, 1);
      }, this.snackbarService.displayError)
    );
  }

  onChange(givenFiles) {
    let fileType = givenFiles[0].type.substring(0, givenFiles[0].type.indexOf('/'));
    if(fileType !== 'image') return;
    this.image = givenFiles[0];
    let reader = new FileReader();
    reader.readAsDataURL(givenFiles[0]); 
    reader.onload = (_event) => { 
      this.imgSrc = reader.result; 
    }
  }

  ngOnDestroy() {
    this.subscriptionsArr.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
