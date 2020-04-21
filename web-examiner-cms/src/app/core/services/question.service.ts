import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionGetRes, QuestionDeleteRes, QuestionPostPutReq, QuestionPutRes } from 'src/app/shared/models/question';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuestionService {

  private urlSuffix = '/question';
  public questions: QuestionGetRes[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  questionGetAll$(): Observable<QuestionGetRes[]> {
    return this.httpClient.get<QuestionGetRes[]>(this.urlSuffix).pipe(map(q => q.map(this.addImagePath)));
  }

  questionsGet$(examNum: number): Observable<QuestionGetRes[]> {
    return this.httpClient.get<QuestionGetRes[]>(this.urlSuffix + '/' + examNum).pipe(map(q => q.map(this.addImagePath)));
  }

  questionDelete$(id: string): Observable<QuestionDeleteRes> {
    return this.httpClient.delete<QuestionDeleteRes>(this.urlSuffix + '/' + id);
  }

  questionPost$(questionPostReq: QuestionPostPutReq): Observable<QuestionGetRes> {
    const formData = new FormData();
    formData.append('question', questionPostReq.question);
    formData.append('question_img', questionPostReq.question_img);
    formData.append('parent_exam_num', String(questionPostReq.parent_exam_num));
    return this.httpClient.post<QuestionGetRes>(this.urlSuffix, formData);
  }

  questionPut$(id: string, questionPutReq: QuestionPostPutReq): Observable<QuestionPutRes> {
    return this.httpClient.put<QuestionPutRes>(this.urlSuffix + '/' + id, questionPutReq);
  }

  private addImagePath(q: QuestionGetRes) {
    q.question_img = environment.IMAGE_BASE_URL + q.question_img;
    return q;
  }
}
