import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExamRes, SubmitExam } from 'src/app/shared/models/exam.model';
import { QuestionRes } from 'src/app/shared/models/question.model';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam.model';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
 
  exam: ExamRes
  questionsArr: QuestionRes[] = [];
  currentQuestion: number = 0;
  currentAnswers: boolean[] = [];
  preSubmit: boolean = true;
  score: number = 0;
  questions: string[];

  // Subscriptions
  questionsSub: Subscription;
  examSubmitSub: Subscription;
  timerSub: Subscription;
  timeListenerSub: Subscription;
  confirmDialogSub: Subscription;

  constructor(
    public examService: ExamService,
    private writtenExamService: WrittenExamService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getQuestions();
    this.listenForTimer();
  }
  
  getQuestions() {
    this.exam = this.examService.getExams.find((e: ExamRes) => e.exam_num == this.route.snapshot.params.id);
    this.questionsSub = this.examService.getQuestions$(this.exam.exam_num).subscribe((res: QuestionRes[]) => {
      this.questionsArr = res;
      this.questions = this.questionsArr.map((q: QuestionRes) => q.question_id);
      this.examService.initStorageKeys(this.questionsArr);
      this.evalCurrentAnswers();
      this.examService.getTimer(this.exam.exam_num);
      this.examService.setTimerInterval();
    }, err => {
      console.error(err);
      this.router.navigate(['/landing']);
    });
  }

  previous() {
    this.setCurrentAnswers();
    this.currentQuestion--;
    this.evalCurrentAnswers();
  }

  next() {
    this.setCurrentAnswers();
    this.currentQuestion++;
    this.evalCurrentAnswers();
  }

  leave() {
    this.setCurrentAnswers();
    this.router.navigate(['/landing']);
  }

  onSubmit() {
    this.confirmDialogSub = this.dialogService.openConfirmDialog().subscribe((res: boolean) => {
      if(res) {
        this.submit();
      }
    });
  }

  submit() {
    this.setCurrentAnswers();
    let answers: string[][] = [];
    for(let i=0; i<this.questionsArr.length; i++) {
      let tempAnswers: string[] = [];
      for(let j=0; j<this.questionsArr[i].answersIds.length; j++) {
        if(this.examService.getValue(i, j) === '1') tempAnswers.push(this.questionsArr[i].answersIds[j]);
      }
      answers.push(tempAnswers);
    }
    const examToSubmit: SubmitExam = {
      exam_num: this.exam.exam_num,
      questions: this.questions,
      answers: answers
    }
    this.preSubmit = false;
    this.examSubmitSub = this.writtenExamService.submitExam(examToSubmit).subscribe((res: WrittenExamGetRes) => {
      this.examService.removeStorageKeys(this.questionsArr);
      this.score = res.score;
    }, this.errorHandler.handleError);
  }

  evalCurrentAnswers() {
    this.currentAnswers = [];
    for(let i=0; i<this.questionsArr[this.currentQuestion].answers.length; i++) {
      this.examService.getValue(this.currentQuestion, i) === '1' ? this.currentAnswers.push(true) : this.currentAnswers.push(false);
    }
  }

  setCurrentAnswers() {
    for(let i=0; i<this.currentAnswers.length; i++) {
      this.examService.setValue(this.currentQuestion, i, this.currentAnswers[i] ? '1' : '-1');
    }
  }

  listenForTimer() {
    this.timeListenerSub = this.examService.timeLimitSubject.subscribe((res: boolean) => {
      if(res) this.submit();
    });
  }

  ngOnDestroy() {
    if(this.questionsSub) this.questionsSub.unsubscribe();
    if(this.examSubmitSub) this.examSubmitSub.unsubscribe();
    if(this.timerSub) this.timerSub.unsubscribe();
  }
}
