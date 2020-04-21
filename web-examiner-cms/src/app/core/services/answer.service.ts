import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerGetRes, AnswerPostReq, AnswerPutReq, AnswerPutRes, AnswerDeleteRes } from 'src/app/shared/models/answer';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnswerService {

  private urlSuffix = '/answer';

  constructor(
    private httpClient: HttpClient
  ) { }

  answersGet$(id: string): Observable<AnswerGetRes[]> {
    return this.httpClient.get<AnswerGetRes[]>(this.urlSuffix + '/' + id).pipe(map(q => q.map(this.addImagePath)));
  }

  answerPost$(answerPostReq: AnswerPostReq): Observable<AnswerGetRes> {
    const formData = new FormData();
    formData.append('answer', answerPostReq.answer);
    formData.append('parent_question', answerPostReq.parent_question);
    formData.append('point', String(answerPostReq.point));
    formData.append('answer_img', answerPostReq.answer_img);
    return this.httpClient.post<AnswerGetRes>(this.urlSuffix, formData);
  }

  answerPut$(id: string, answerPutReq: AnswerPutReq): Observable<AnswerPutRes> {
    return this.httpClient.put<AnswerPutRes>(this.urlSuffix + '/' + id, answerPutReq);
  }

  answerDelete$(id: string): Observable<AnswerDeleteRes> {
    return this.httpClient.delete<AnswerDeleteRes>(this.urlSuffix + '/' + id);
  }

  private addImagePath(q: AnswerGetRes) {
    q.answer_img = environment.IMAGE_BASE_URL + q.answer_img;
    return q;
  }
}
