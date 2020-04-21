import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ExamRes, SubmitExam } from 'src/app/shared/models/exam.model';
import { QuestionRes, Answer } from 'src/app/shared/models/question.model';
import { environment } from '../../../environments/environment';
import { TimeLeft } from 'src/app/shared/models/timer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private exams: ExamRes[] = [];
  timer: string[] = ['59', '59'];

  private examUrlSuffix: string = '/exam';
  private questionsUrlSuffix: string = '/question';

  private answersStorageKeys: string[] = [];
  private interval;

  public timeLimitSubject = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandler
  ) {
   }

  getExams$(): Observable<ExamRes[]> {
    return this.httpClient.get<ExamRes[]>(this.examUrlSuffix);
  }

  getQuestions$(exam_num: number): Observable<QuestionRes[]> {
    return this.httpClient.get<QuestionRes[]>(this.questionsUrlSuffix + '/' + exam_num)
      .pipe(map((q: QuestionRes[]) => q.map(this.addImagePath)));
  }

  getTimer(exam_num: number) {
    this.httpClient.get<TimeLeft>(this.questionsUrlSuffix + '/time/' + exam_num).subscribe((res: TimeLeft) => {
      this.timer[0] = String(Math.floor(res.timeLeft / 60));
      this.timer[1] = String(res.timeLeft % 60);
      if(this.timer[1].length === 1) this.timer[1] = '0' + this.timer[1];
    }, this.errorHandler.handleError);;
  }

  get getExams(): ExamRes[] {
    return this.exams;
  }

  setExams(exams: ExamRes[]) {
    this.exams = exams;
  }

  initStorageKeys(questions: QuestionRes[]) {
    if(!!localStorage.getItem('0:0')) return;
    for(let i=0; i<questions.length; i++) {
      for(let j=0; j<questions[i].answers.length; j++) {
        const key: string = i + ':' + j;
        this.answersStorageKeys.push(key);
        localStorage.setItem(key, '-1');
      }
    }
  }

  removeStorageKeys(questions: QuestionRes[]) {
    if(!localStorage.getItem('0:0')) return;
    if(this.interval) clearInterval(this.interval);
    for(let i=0; i<questions.length; i++) {
      for(let j=0; j<questions[i].answers.length; j++) {
        const key: string = i + ':' + j;
        localStorage.removeItem(key);
      }
    }
  }

  getValue(i: number, j: number) {
    if(!localStorage.getItem('0:0')) return;
    return localStorage.getItem(i + ':' + j);
  }

  setValue(i: number, j: number, value: string) {
    if(!localStorage.getItem('0:0')) return;
    localStorage.setItem(i + ':' + j, value);
  }

  setTimerInterval() {
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(Number(this.timer[0]) < 0 ) {
        this.timer = ['0', '00'];
      }
      else if(Number(this.timer[0]) === 0 && Number(this.timer[1]) === 0) {
        this.timeLimitSubject.next(true);
        clearInterval(this.interval);
      } else if(Number(this.timer[1]) === 0) {
        this.timer[0] = String(Number(this.timer[0]) - 1);
        this.timer[1] = '59';
      } else {
        if(this.timer[1][1] == '0') {
          this.timer[1] = String(Number(this.timer[1][0]) - 1) + '9';
        } else {
          this.timer[1] = this.timer[1][0] + String(Number(this.timer[1][1]) - 1);
        }
      }
    }, 1000);
  }

  private addImagePath(q: QuestionRes) {
    q.question_img = environment.IMAGE_BASE_URL + q.question_img;
    q.answers = q.answers.map((ans: Answer) => {
      ans.answer_img = environment.IMAGE_BASE_URL + ans.answer_img;
      return ans;
    });
    return q;
  }
}
