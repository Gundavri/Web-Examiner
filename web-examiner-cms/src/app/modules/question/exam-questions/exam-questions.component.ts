import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { QuestionGetRes, QuestionPostPutReq, QuestionDeleteRes, QuestionPutRes } from 'src/app/shared/models/question';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { QuestionService } from 'src/app/core/services/question.service';
import { environment } from 'src/environments/environment';
import { AnswerGetRes, AnswerPutRes, AnswerDeleteRes } from 'src/app/shared/models/answer';
import { AnswerService } from 'src/app/core/services/answer.service';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss']
})
export class ExamQuestionsComponent implements OnInit, OnDestroy {

  questionsToShow: QuestionGetRes[] = [];
  isDisabled: boolean[] = []
  answers = {};
  prevSearch: string = '';
  urlParam: number = 0;
  addClicked = {};
  imgSrc = {};
  image = {};
  lastAnswersParent: string;

  // Subscriptions Array
  subscriptionsArr: Subscription[] = [];

  constructor(
    public questionService: QuestionService,
    private answerService: AnswerService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) { }

  @HostListener('window:paste', ['$event.clipboardData.files'])
  handleImgPaste(files: []) {
    if(files.length > 0 && this.lastAnswersParent && this.addClicked[this.lastAnswersParent]){
      this.onChange(files, this.lastAnswersParent);
    }
  }

  ngOnInit() {
    this.urlParam = Number(this.route.snapshot.params.id);
    this.getQuestions();
  }

  getQuestions() {
    this.subscriptionsArr.push(
      this.questionService.questionsGet$(this.urlParam)
        .subscribe((res: QuestionGetRes[]) => {
          this.questionService.questions = res;
          this.questionService.questions.forEach((q: QuestionGetRes) => {
            this.getAnswer(q._id)
            this.addClicked[q._id] = false;
          });
          this.search();
      }, this.snackbarService.displayError)
    );
  }

  getAnswer(_id: string) {
    this.subscriptionsArr.push(
      this.answerService.answersGet$(_id).subscribe((res: AnswerGetRes[]) => {
        this.answers[_id] = res;
      })
    );
  }

  onQuestionAdd() {
    this.subscriptionsArr.push(
      this.dialogService.openCreateUpdateQuestionDialog({
        question: '',
        parent_exam_num: this.urlParam
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

  onQuestionUpdate(index: number, parent_exam_num: string, question: string) {
    this.subscriptionsArr.push(
      this.questionService.questionPut$(this.questionsToShow[index]._id, {parent_exam_num: Number(parent_exam_num), question}).subscribe((res: QuestionPutRes) => {
        for(let i=0; i<this.questionService.questions.length; i++){
          if(this.questionService.questions[i]._id === this.questionsToShow[index]._id){
            if(this.questionService.questions[i].parent_exam_num !== Number(parent_exam_num)) this.questionService.questions.splice(i, 1);
            else this.questionService.questions[i].question = question;
            break;
          }
        }
        this.search();
      }, this.snackbarService.displayError)
    );
  }

  changeIsDisabled(examNum: string, question, index: number) {
    if(Number(examNum) !== this.questionsToShow[index].parent_exam_num || question !== this.questionsToShow[index].question) {
      this.isDisabled[index] = false;
    } else {
      this.isDisabled[index] = true;
    }
  }

  onQuestionDelete(index: number) {
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

  search() {
    this.questionsToShow = [...this.questionService.questions];
    this.isDisabled = new Array(this.questionsToShow.length).fill(true);
    this.questionsToShow = this.questionService.questions.filter((q: QuestionGetRes) => {
      return q.question.toLowerCase().includes(this.prevSearch.toLowerCase()) || q.parent_exam_num.toString().includes(this.prevSearch);
    });
  }

  onSearchChange(toSearch: string) {
    this.prevSearch = toSearch;
    this.search();
  }

  // Answers functions
  onNew(answer: string, point: string, parentId: string) {
    this.subscriptionsArr.push(
      this.answerService.answerPost$({
        answer: answer,
        point: Number(point),
        parent_question: parentId,
        answer_img: this.image[parentId]
      }).subscribe((res: AnswerGetRes) => {
        res.answer_img = environment.IMAGE_BASE_URL + res.answer_img;
        if(!this.answers[parentId]) this.answers[parentId] = [];
        this.answers[parentId].push(res);
        this.onClear(parentId);
      }, this.snackbarService.displayError)
    );
  }

  onClear(parentId: string) {
    this.addClicked[parentId] = false;
    this.imgSrc[parentId] = '';
    this.image[parentId] = null;
  }

  onUpdate(index: number, answer: string, point: string, parentId: string) {
    this.subscriptionsArr.push(
      this.answerService.answerPut$(this.answers[parentId][index]._id, {
        answer: answer,
        point: Number(point)
      }).subscribe((res: AnswerPutRes) => {
        this.answers[parentId][index].answer = answer;
        this.answers[parentId][index].point = Number(point);
      }, this.snackbarService.displayError)
    );
  }

  onDelete(index: number, parentId: string) {
    this.subscriptionsArr.push(
      this.answerService.answerDelete$(this.answers[parentId][index]._id).subscribe((res: AnswerDeleteRes) => {
        this.answers[parentId].splice(index, 1);
      }, this.snackbarService.displayError)
    );
  }

  onChange(givenFiles, parentId: string) {
    let fileType = givenFiles[0].type.substring(0, givenFiles[0].type.indexOf('/'));
    if(fileType !== 'image') return;
    this.image[parentId] = givenFiles[0];
    let reader = new FileReader();
    reader.readAsDataURL(givenFiles[0]); 
    reader.onload = (_event) => { 
      this.imgSrc[parentId] = reader.result; 
    }
  }

  ngOnDestroy() {
    this.subscriptionsArr.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
