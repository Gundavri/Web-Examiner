import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/core/services/question.service';
import { QuestionGetRes, QuestionDeleteRes, QuestionPostPutReq, QuestionPutRes } from 'src/app/shared/models/question';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questionsToShow: QuestionGetRes[] = [];
  prevSearch: string = '';
  urlParam: number = 0;

  // Subscriptions Array
  subscriptionsArr: Subscription[] = [];

  constructor(
    public questionService: QuestionService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.subscriptionsArr.push(
      this.questionService.questionGetAll$()
        .subscribe((res: QuestionGetRes[]) => {
          this.questionService.questions = res;
          this.search();
      }, this.snackbarService.displayError)
    );
  }

  onAdd() {
    this.subscriptionsArr.push(
      this.dialogService.openCreateUpdateQuestionDialog({
        question: '',
        parent_exam_num: null 
      }).subscribe((res1: QuestionPostPutReq) => {
        if(res1) {
          this.subscriptionsArr.push(
            this.questionService.questionPost$(res1).subscribe((res2: QuestionGetRes) => {
              res2.question_img = environment.IMAGE_BASE_URL + res2.question_img;
              this.questionService.questions.push(res2);
              this.search();
            }, this.snackbarService.displayError)
          );  
        }
      })
    );
  }

  onUpdate(index: number) {
    this.subscriptionsArr.push(
      this.dialogService.openCreateUpdateQuestionDialog(this.questionService.questions[index]).subscribe((res1: QuestionPostPutReq) => {
        if(res1) {
          this.subscriptionsArr.push(
            this.questionService.questionPut$(this.questionsToShow[index]._id, res1).subscribe((res2: QuestionPutRes) => {
              for(let i=0; i<this.questionService.questions.length; i++){
                if(this.questionService.questions[i]._id === this.questionsToShow[index]._id){
                  this.questionService.questions[i].parent_exam_num = res1.parent_exam_num ? res1.parent_exam_num : null;
                  this.questionService.questions[i].question = res1.question;
                  break;
                }
              }
              this.search();
            }, this.snackbarService.displayError));
          }
        }
      )
    );
  }

  onDelete(index: number) {
    this.subscriptionsArr.push(
      this.dialogService.openConfirmDialog().subscribe((res1: boolean) => {
        if(res1) {
          this.subscriptionsArr.push(
            this.questionService.questionDelete$(this.questionsToShow[index]._id).subscribe((res2: QuestionDeleteRes) => {
              this.questionService.questions = this.questionService.questions.filter((question: QuestionGetRes) => {
                return question._id !== this.questionsToShow[index]._id;
              });
              this.search();
            }, this.snackbarService.displayError)
          );
        }
      })
    );
  }

  onAnswers(index: number) {
    this.subscriptionsArr.push(
      this.dialogService.openAnswersDialog(this.questionsToShow[index]).subscribe((res: any) => {})
    );
  }

  search() {
    this.questionsToShow = [...this.questionService.questions];
    this.questionsToShow = this.questionService.questions.filter((q: QuestionGetRes) => {
      return q.question.toLowerCase().includes(this.prevSearch.toLowerCase()) || q.parent_exam_num.toString().includes(this.prevSearch);
    });
  }

  onSearchChange(toSearch: string) {
    this.prevSearch = toSearch;
    this.search();
  }

  openImage(index: number) {
    if(this.questionsToShow[index].question_img) {
      this.subscriptionsArr.push(
        this.dialogService.openViewImage(this.questionsToShow[index].question_img).subscribe(() => {})
      );
    }
  }

  ngOnDestroy() {
    this.subscriptionsArr.forEach((sub: Subscription) => sub.unsubscribe());
  }
} 
